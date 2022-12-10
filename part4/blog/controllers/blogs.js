const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// get all blogs
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

// add a blog
blogRouter.post('/', async (request, response) => {
    const blog = request.body

    const blogToPost = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    })
  
    const blogSaved = await blogToPost.save()
    response.status(201).json(blogSaved)
  })

module.exports = blogRouter