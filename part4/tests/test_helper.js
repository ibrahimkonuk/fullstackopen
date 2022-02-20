const Post = require('../models/post')

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

module.exports = {
    initialPosts,
    postsInDb,
}