const app = require('../api/server');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const db = require('../data/dbConfig');


describe('routes', () => {
    describe('POST /api/register', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should return 201 status code', async () => {
            await request(app).post('/api/register').send({ "username": 'merry', "password": bcrypt.hashSync('pass', 8) }).expect(201);
        })
        it('should return the new user', async () => {
            const newUser = await request(app).post('/api/register').send({ username: 'merry', password: bcrypt.hashSync('pass', 8) });
            expect(newUser.body.username).toBe('merry');
        })
        it("should return 400 if no username or password is provided", async () => {
            await request(app).post('/api/register').send({ username: 'merry' }).expect(400);
        })
    })
    describe('DELETE /api/users', () => {
        beforeEach(async () => {
            await request(app).post('/api/register').send({ username: 'merry', password: bcrypt.hashSync('pass', 8) });
        })
        afterEach(async () => {
            await db('users').truncate();
        })
        it('should return status code 200', async () => {
            await request(app).delete('/api/users/1').expect(200);
        })
        it("should return an array of users", async () => {
            await request(app).post('/api/register').send({ username: 'frodo', password: bcrypt.hashSync('pass', 8) });
            await request(app).post('/api/register').send({ username: 'sam', password: bcrypt.hashSync('pass', 8) });
            const users = await request(app).delete('/api/users/1');
            expect(users.body).toContainEqual(expect.objectContaining({
                id: expect.any(Number),
                username: expect.any(String),
                password: expect.any(String)
            }))
        })
    })
})