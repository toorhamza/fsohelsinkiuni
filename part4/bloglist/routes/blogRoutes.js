const router = require("express").Router();
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const checkToken = require('../utils/checkTokenMiddleWare')


router.get("/api/blogs", (request, response) => {
  Blog.find({})
    .populate("user")
    .then(blogs => {
      response.json(blogs);
    });
});

router.post("/api/blogs", checkToken, async (request, response, next) => {
  try{
  const decodedToken = request.decoded
  const body = request.body;
  var likes = request.body.likes;
  if (!likes) {
    request.body.likes = 0;
  }

  const title = request.body.title;
  const url = request.body.url;

  if (!title || !url) {
    return response.status(400).json({
      error: "data missing. check title and url"
    });
  }

  const user = await User.findById(decodedToken.id);
  console.log("======================User Object=============================")
  console.log(user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON())(exception);
  
} catch (exception) {
  next(exception);
}
});

router.delete("/api/blogs/:id", checkToken, async (request, response) => {
  const id = request.params.id;
  const user = request.decoded
  //console.log(user)
  const blogPost = (await Blog.findById(id)).toJSON()


  if(blogPost.user.toString() === user.id.toString()) {
    const remove = await Blog.findByIdAndRemove(id);
    return response.status(204).end();

    } else {
      return response.status(400).json({
        "error": "invalid owner. This user can not delete this blogpost"
      })
    }

});

router.put("/api/blogs/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  console.log(blog)

  const update = await Blog.findByIdAndUpdate(id, blog, { likes: body.likes });

  response.json(update.toJSON());
});

module.exports = router;
