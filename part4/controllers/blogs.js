const blogRouter = require('express').Router()
const Post = require('../models/post')

blogRouter.get('/', (request, response, next) => {
    Post
        .find({})
        .then((posts) => {
            posts
                ? response.json(posts)
                : response.status(404)
        })
        .catch(error => next(error))
})

blogRouter.get('/:id', (request, response, next) => {
    Post
        .find({ _id: request.params.id })
        .then(post => {
            post
                ? response.json(post)
                : response.status(404)
        })
        .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
    let body = request.body

    Post
        .create(body)
        .then(post => response.json(post))
        .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
    Post
        .findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then(updatedPost => {
            updatedPost
                ? response.json(updatedPost)
                : response.status(404)
        })
        .catch(error => next(error))

})

blogRouter.delete('/:id', (request, response, next) => {
    Post
        .findByIdAndDelete({ _id: request.params.id })
        .then(() => {
            response.status(200).send({ success: 'post deleted' })
        })
        .catch(error => next(error))
})

module.exports = blogRouter