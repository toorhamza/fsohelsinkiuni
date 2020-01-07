const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userSchema");

const api = supertest(app);

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

describe('when there is initially one user at db', () => {
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })