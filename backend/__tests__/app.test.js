const request = require('supertest');
const { app } = require('../app');

describe('POST /login', () => {
  it('logs in successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'sanjeeb', password: 'sanjeeb' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username', 'sanjeeb');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('id');
  });
});
