const bcrypt = require('bcrypt')
const User = require('../models/user')
const testHelper = require('../tests/test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('should create a new user', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'unique',
            name: 'unique',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    });

    test('should not allow duplicated username', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const duplicatedUser = {
            username: 'root',
            name: 'root',
            password: 'password'
        }

        const result = await api
            .post('/api/users')
            .send(duplicatedUser)

        expect(result.body.error).toContain('username must be unique')
        const currentUsers = await testHelper.usersInDb()
        expect(usersAtStart).toEqual(currentUsers)

    });
});