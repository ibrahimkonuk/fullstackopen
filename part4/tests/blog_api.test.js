const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const Post = require('../models/post')
const User = require('../models/user')

beforeEach(async () => {
    await Post.deleteMany({})
    await User.deleteMany({})

    const password = await bcrypt.hash('password', 10)
    const user = new User({
        username: 'test',
        name: 'test',
        password,
    })
    const savedUser = await user.save()

    const userForToken = {
        username: savedUser.username,
        id: savedUser._id.toString(),
    }
    token = jwt.sign(userForToken, config.SECRET)

    for (let post of helper.initialPosts) {
        post.user = savedUser._id.toString()
        let postObject = new Post(post)
        await postObject.save()
    }
})

describe('should test api', () => {
    test('blog posts are returned as json', async () => {
        await api
            .get('/api/blog')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should return one post', async () => {
        const response = await api.get('/api/blog')
        expect(response.body).toHaveLength(helper.initialPosts.length)
    })

    test('should return title of the first post', async () => {
        const response = await api.get('/api/blog')
        const title = response.body.map(post => post.title)
        expect(title).toContain('React patterns')
    })

    test('should add a valid post', async () => {
        const newPost = {
            "title": "New post",
            "author": "New author",
            "url": "https://newurl.com",
            "likes": 10
        }

        await api.post('/api/blog').set('Authorization', `bearer ${token}`).send(newPost).expect(200).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blog')
        const titles = response.body.map(post => post.title)

        expect(response.body).toHaveLength(helper.initialPosts.length + 1)
        expect(titles).toContain('New post')

    })

    test('should get a particular post', async () => {
        const posts = await helper.postsInDb()
        const post = posts[0]
        const resultPost = await api.get(`/api/blog/${post.id}`)
            .expect(200).expect('Content-Type', /application\/json/)
        const processedPost = JSON.parse(JSON.stringify(post))
        expect(resultPost.body[0]).toEqual(processedPost)

    })

    test('should delete a post', async () => {
        const postToDelete = new Post({ ...helper.initialPosts[0] })
        await postToDelete.save()
        const postsAtStart = await helper.postsInDb()

        await api.delete(`/api/blog/${postToDelete.id}`).set('Authorization', `bearer ${token}`).expect(200)

        const postsAtEnd = await helper.postsInDb()

        expect(postsAtEnd).toHaveLength(
            postsAtStart.length - 1
        )

        const titles = postsAtEnd.map(post => post.title)

        expect(titles).not.toContain(...postToDelete.title)
    })

    test('should set likes property to 0 if left empty', async () => {
        const newPost = {
            "title": "New title",
            "author": "Author",
            "url": "https://a.com"
        }

        await api.post('/api/blog').set('Authorization', `bearer ${token}`).send(newPost).expect(200)

        const response = await api.get('/api/blog')
        expect(response.body).toHaveLength(helper.initialPosts.length + 1)
        expect(response.body[1].likes).toBe(0)
    })

    test('should not add a post without title', async () => {
        const newPost = new Post({
            author: 'Robert C. Martin',
            url: 'http://a.com',
        })

        await expect(newPost.validate()).rejects.toThrow();

        const postsInDb = await helper.postsInDb()
        expect(postsInDb).toHaveLength(helper.initialPosts.length)
    })

    test('should update post', async () => {
        const posts = await helper.postsInDb()
        const firstPost = posts[0]
        const beforeLikes = firstPost.likes
        firstPost.likes += 1

        await api.put(`/api/blog/${firstPost.id}`).send(firstPost).set('Authorization', `bearer ${token}`).expect(200)

        const updatedPosts = await helper.postsInDb()
        const updatedPost = updatedPosts[0]

        expect(updatedPost.likes).toBe(beforeLikes + 1)
    })

    test('should reject unauthorised post creation', async () => {
        const newPost = {
            "title": "New post",
            "author": "New author",
            "url": "https://newurl.com",
            "likes": 10
        }

        await api.post('/api/blog').send(newPost).expect(401).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blog')

        expect(response.body).toHaveLength(helper.initialPosts.length)
    });

})

afterAll(() => {
    mongoose.connection.close()
})