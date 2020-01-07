const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogSchema");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();

  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are eight blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(2);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("post request add a new blog successfully", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "test",
    url: "https://google.com",
    likes: 6
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map(r => r.title);

  expect(contents).toContain("async/await simplifies making async calls");

  expect(response.body.length).toBe(initialBlogs.length + 1);
});

test("post request add a new blog successfully", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "test",
    url: "https://google.com",
    likes: 6
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map(r => r.title);

  expect(contents).toContain("async/await simplifies making async calls");

  expect(response.body.length).toBe(initialBlogs.length + 1);
});

test("if likes missing it should be always zero", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "test",
    url: "https://google.com"
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.filter(r => r.title === newBlog.title);

  expect(contents[0].likes).toBeDefined();
});

test("if likes missing it should be always zero", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "test",
    url: "https://google.com"
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.filter(r => r.title === newBlog.title);

  expect(contents[0].likes).toBeDefined();
});

test("if title and url missing it respond with 400 bad request", async () => {
  const newBlog = {
    author: "test",
    likes: 5
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
