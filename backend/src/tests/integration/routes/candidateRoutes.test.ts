const request = require('supertest');
const app = require('../../../app'); // Adjust the path to your app

describe('Candidate Routes', () => {
    it('should return a list of candidates', async () => {
        const response = await request(app).get('/candidates');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});