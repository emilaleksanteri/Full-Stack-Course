const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const blog = require('../models/blog')

// all comments
commentRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({})
    .populate('blog',
    { title: 1, author: 1, url: 1, likes: 1 })

    response.json(comments)
})

commentRouter.post('/', async (request, response) => {
  const body = request.body

  const commentToAdd = new Comment({
    comment: body.comment,
    blog: body.blog
  })

  const commentAdded = await commentToAdd.save() // save comment
  // add comment under blog post
  const blogToCommentTo = await Blog.findById(body.blog)
  blogToCommentTo.comments = blogToCommentTo.comments.concat(commentAdded._id)
  await blogToCommentTo.save()

  response.status(201).json(commentAdded)
})

module.exports = commentRouter