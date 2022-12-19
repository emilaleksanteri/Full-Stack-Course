const blogRouter = require('express').Router()
const { request, response } = require('../app')
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

// delete blog
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// edit a blog -> likes can change
blogRouter.put('/:id', async (request, response) => {
  const blogBody = request.body

  const blog = {
    title: blogBody.title,
    author: blogBody.author,
    url: blogBody.url,
    likes: blogBody.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: blogBody.likes })
 
  response.json(blog)
})

module.exports = blogRouter