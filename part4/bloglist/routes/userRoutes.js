const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/userSchema");
const Blog = require('../models/blogSchema')


usersRouter.post("/api/users", async (request, response, next) => {
  try {
    const body = request.body;
    const saltRounds = 10;
    const password = body.password;

    if (password.length < 3) {
      console.log("it works");
      return response.status(400).json({
        error: "password length is less than 3"
      });
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get("/api/users", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs");
    response.json(users.map(u => u.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

usersRouter.delete("/api/users/:id", async (request, response, next) => {
    const id = request.params.id
  const result = await User.findByIdAndRemove(id)
  response.status(201).end();
});

module.exports = usersRouter;
