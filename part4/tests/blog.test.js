const listHelper = require('../utils/list_helper')
const posts = require('./mock-data')

describe('posts', () => {
    test('should return total likes', () => {
        const totalLikes = listHelper.totalLikes(posts)
        expect(totalLikes).toBe(36)
    })

    test('should return favourite post', () => {
        const favourite = listHelper.favouritePost(posts)
        expect(favourite).toEqual(posts[2])
    });

    test('should return author with most likes', () => {
        const author = listHelper.mostPosts(posts)
        expect(author.author).toBe('Robert C. Martin')
        expect(author.posts).toBe(3)
    });

    test('should return author with the most likes', () => {
        const author = listHelper.mostLikes(posts)
        expect(author.likes).toBe(17)
    });
});

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})