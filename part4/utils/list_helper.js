const _ = require('lodash')

const dummy = (posts) => {
    return 1
}

const totalLikes = (posts) => {
    return posts.reduce((total, el) => total + el.likes, 0)
}

const favouritePost = (posts) => {
    return posts.reduce((prev, current) =>
        (prev.likes > current.likes) ? prev : current, { 'author': '', 'posts': 0 }
    )
}

const mostPosts = (posts) => {
    const postsByAuthor = _.countBy(posts, blog => blog.author)
    return _.reduce(postsByAuthor, (result, value, author) => {
        if (value > result.posts) {
            result.posts = value
            result.author = author
        }
        return result
    }, { 'author': '', 'posts': 0 })
}

const mostLikes = (posts) => {
    const authorGroups = _.groupBy(posts, post => post.author)
    const authors = Object.keys(authorGroups)
    for (const author of authors) {
        authorGroups[author] = totalLikes(authorGroups[author])
    }
    return _.reduce(authorGroups, (result, value, author) => {
        if (value > result.likes) {
            result.author = author
            result.likes = value
        }
        return result
    }, { 'author': '', 'likes': 0, })
}

module.exports = {
    dummy,
    totalLikes,
    favouritePost,
    mostPosts,
    mostLikes,
}