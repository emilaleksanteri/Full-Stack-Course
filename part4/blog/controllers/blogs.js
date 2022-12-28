const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

// get all blogs
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user',
    { username: 1, name: 1 })

    response.json(blogs)
  })

// add a blog
blogRouter.post('/', userExtractor, async (request, response) => {
  const blog = request.body
  const user = request.user

  const blogToPost = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: user._id
  })

  const blogSaved = await blogToPost.save()
  // from promise, take post id, add to users blogs array field
  user.blogs = user.blogs.concat(blogSaved._id)
  // save via promise
  await user.save()
  response.status(201).json(blogSaved)
  })

// delete blog
blogRouter.delete('/:id', userExtractor, async (request, response) => {
  // try to find blog in db
  const blog = await Blog.findById(request.params.id)
  // if already deleted, let user know its deleted
  if (!blog) {
    return response.status(204).end()
  }
  // unautorized user
  if ( blog.user && blog.user.toString() !== request.user.id ) {
    return response.status(401).json({
      error: 'unauthorized action, only creator can delete posts'
    })
  }
  // if all passed, delete
  await Blog.findByIdAndDelete(request.params.id)
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

  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: blogBody.likes })
 
  response.json(blogUpdated)
})

module.exports = blogRouter