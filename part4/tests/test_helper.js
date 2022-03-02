const Post = require('../models/post')
const User = require('../models/user')

const initialPosts = [
    {
        "title": "React patterns",
        "author": "Michael Chan",
        "url": "https://reactpatterns.com/",
        "likes": 5
    }
]

const postsInDb = async () => {
    const posts = await Post.find({})
    return posts.map(post => post.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialPosts,
    postsInDb,
    usersInDb,
}