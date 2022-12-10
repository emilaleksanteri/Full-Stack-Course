const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

// temporary test db set up
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Testing the backend', () => {
  
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns blogs', async () => {
    const response = await helper.allBlogs()

    expect(response).toHaveLength(helper.initialBlogs.length)
  })

  test('check that blog posts have an id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body


    blogs.every(blog => expect(blog.id).toBeDefined())
  })

  test('a valid blog can be added to db', async () => {
    const postBlog = {
      title: 'A secret to valid blog',
      author: 'Stephen King',
      url:'www.BlogsRUs.fi',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(postBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await helper.allBlogs()

    titles = response.map(blog => blog.title)

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('A secret to valid blog')
  })

  test('no likes -> default to 0', async () => {
    const blogs = helper.initialBlogs.map(blog => {
      if ('likes' in blog === false){
        blog.likes = 0
      }
      return blog.likes
    })

    const response = await helper.allBlogs()
    const responseBlogLikes = response.map(blog => blog.likes)

    expect(responseBlogLikes[0]).toEqual(blogs[0])
  })

  test('if no title or url, response 400 bad request', async () => {
    const postBlog = {
      author: 'Stephen King'
    }

    await api
      .post('/api/blogs')
      .send(postBlog)
      .expect(400)

    const response = await helper.allBlogs()

    expect(response).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})