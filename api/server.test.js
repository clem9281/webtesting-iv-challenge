const app = require('./server');
const request = require('supertest');
const bcrypt = require('bcryptjs');

describe('app', () => {
    describe('get', () => {
        it("should return '<h1>WebTesting IV</h1>'", async () => {
            const response = await request(app).get('/');
            expect(response.text).toBe('<h1>WebTesting IV</h1>')
        })
    })
})