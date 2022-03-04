const blogRouter = require('express').Router()
const Post = require('../models/post')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.get('/', async (request, response) => {
    const posts = await Post.find({}).populate('user')
    posts
        ? response.json(posts)
        : response.status(404)
})

blogRouter.get('/:id', async (request, response) => {
    const post = await Post.find({ _id: request.params.id })
    post
        ? response.json(post)
        : response.status(404)
})

blogRouter.post('/', async (request, response) => {
    const token = getTokenFrom(request)

    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const post = new Post({
        ...request.body,
        user: user._id
    })
    const savedPost = await Post.create(post)
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    response.json(post)
})

blogRouter.put('/:id', async (request, response) => {
    const updatedPost = await Post
        .findByIdAndUpdate(request.params.id, request.body, { new: true })

    updatedPost
        ? response.json(updatedPost)
        : response.status(404)
})

blogRouter.delete('/:id', async (request, response) => {
    const post = await Post.findById({ _id: request.params.id })
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, config.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (post.user.toString() === decodedToken.id.toString()) {
        await Post.findByIdAndDelete({ _id: request.params.id })
        response.status(200).end()
    } else {
        response.status(403).json({ error: 'invalid user' })
    }

})

module.exports = blogRouter