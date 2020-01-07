const router = require('express').Router()
const Blog = require('../models/blogSchema')


router.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  router.post('/api/blogs', (request, response) => {
    var likes = request.body.likes
    if (!likes){
      request.body.likes = 0
    }

    const title = request.body.title
    const url = request.body.url
    
    if (!title || !url) {
      return response.status(400).json({
        "error": "data missing. check title and url"
      })
    }

    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  router.delete('/api/blogs/:id', async (request, response) => {
    const id = request.params.id
    const remove = await Blog.findByIdAndRemove(id)

      response.status(204).end()

  })

  router.put('/api/blogs/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    console.log(body)
    const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    }

    const update = await Blog.findByIdAndUpdate(id, blog, {likes: body.likes})

    response.json(update.toJSON())
  })

  module.exports = router