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
            expect(users).toEqual([]);
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
    describe('delete',  () => {
        it('should remove a user from the database', async () => {
            await dbHelpers.insert({username: 'aragorn', password: bcrypt.hashSync('pass', 8)});
            const deleted = await dbHelpers.remove({id: 1});
            expect(deleted).toBe(1);
            const users = await dbHelpers.find();
            expect(users).toEqual([]);
        })
    })
})