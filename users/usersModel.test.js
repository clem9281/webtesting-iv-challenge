const dbHelpers = require('./usersModel');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

describe('users model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    describe('find', () => {
        it("should return an array of users", async () => {
            const users = await dbHelpers.find();
            expect(users).toEqual(expect.arrayContaining([]));
            if (users.length > 0) {
                expect(users).toContainEqual(expect.objectContaining({
                    id: expect.any(Number),
                    username: expect.any(String),
                    password: expect.any(String)
                }))
            }
        })
    })
    describe('insert', () => {
        it("should return a the created user", async () => {
            const user = await dbHelpers.insert({ username: 'pippin', password: bcrypt.hashSync('pass', 8) });
            expect(user).toEqual(expect.objectContaining({
                username: 'pippin'
            }))
        })
    })
})