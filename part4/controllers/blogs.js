const blogRouter = require('express').Router()
const Post = require('../models/post')

blogRouter.get('/', async (request, response) => {
    const posts = await Post.find({})
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
    let body = request.body
    const post = await Post.create(body)
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
    await Post.findByIdAndDelete({ _id: request.params.id })
    response.status(200).end()
})

module.exports = blogRouter