const app = require('../api/server');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const db = require('../data/dbConfig');


describe('routes', () => {
    beforeEach(async() => {
        await db('users').truncate();
    });
    describe('register', () => {
        it('should return 201 status code', async () => {
            const newUser = await request(app).post('/api/register').send({"username": 'merry', "password": bcrypt.hashSync('pass', 8)}).expect(201);
        })
         it('should return the new user', async () => {
            const newUser = await request(app).post('/api/register').send({username: 'merry', password: bcrypt.hashSync('pass', 8)});
            expect(newUser.body.username).toBe('merry');
        })
        it("should return 400 if no username or password is provided", async () => {
            const response = await request(app).post('/api/register').send({username: 'merry'}).expect(400);
        })
    })
})