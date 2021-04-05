const request = require('supertest');
const { validate } = require('uuid');

const app = require('../');

describe('Users', () => {
  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Thiago Novato',
        username: 'thiagonovato'
      })
    expect(201);

    expect(validate(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      name: 'Thiago Novato',
      username: 'thiagonovato',
      todos: []
    });
  });

  it('should not be able to create a new user when username already exists', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Thiago Novato',
        username: 'thiagonovato'
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Thiago Novato',
        username: 'thiagonovato'
      })
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });
});