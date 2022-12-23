const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

// testing on users

beforeEach(async () => {
  await User.deleteMany({})
  // create initial user, also used for auth Token
  const passwordHash = await bcrypt.hash('strongpassword', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there is initially a single user in db', () => {

  test('creation of a new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'emillystimaki',
      name: 'Emil Lystimaki',
      password: 'Strong22#',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAfter.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('if username not unique -> new user not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const notUniqueUser = {
      username: 'root',
      name: 'Mr. Root',
      password: 'R00tingAndT@@ting'
    }

    const createUser = await api
      .post('/api/users')
      .send(notUniqueUser)
      .expect(400)

    const usersEnd = await helper.usersInDb()

    expect(usersEnd).toHaveLength(usersAtStart.length)
    expect(createUser.body.error).toContain('username must be unique')
  })

  test('missing username or password, not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const missingFieldUn = {
      name: 'Missing Fields',
      password: 'HashTh1s#'
    }

    const missingFieldPs = {
      username: 'noPassword',
      name: 'I dont like passwords',
    }

    const missingUsername = await api
      .post('/api/users')
      .send(missingFieldUn)
      .expect(400)

    const missingPassword = await api
      .post('/api/users')
      .send(missingFieldPs)
      .expect(400)

    const usersAfter = await helper.usersInDb()

    expect(missingUsername.body.error).toContain('missing username or password')
    expect(missingPassword.body.error).toContain('missing username or password')
    expect(usersAfter).toHaveLength(usersAtStart.length)
  })

  test('user with too short of a username is not create', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'hi',
      name: 'long name',
      password: 'H3ll@'
    }

    const userSend = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
    
    const usersAfter = await helper.usersInDb()
    
    expect(userSend.body.error).toContain('username not long enough, minimum 3 characters')
    expect(usersAfter).toHaveLength(usersAtStart.length)
  })

  test('user with weak password can not be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWeak = {
      username: 'passwordKing',
      name: 'King of Passwords',
      password: 'password',
    }

    const weakUser = await api
      .post('/api/users')
      .send(userWeak)
      .expect(400)
    
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersAtStart.length)
    expect(weakUser.body.error).toContain('password needs to include at least a one number and special character')
  })
})

// testing on blogs begins here

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('testing existing blogs', () => {
  // temporary test db set up
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
})

describe('adding blog to db', () => {
  test('a valid blog can be added to db', async () => {

    const users = await helper.usersInDb()
    const user = users[0]
    
    const loginCredentials = {
      username: user.username,
      password: 'strongpassword',
    }

    const login = await api
      .post('/api/login')
      .send(loginCredentials)
    
    const token = login.body.token
    const authorization = 'Bearer ' + token
     
    // create blog
    const postBlog = {
      title: 'A secret to valid blog',
      author: 'Stephen King',
      url:'www.BlogsRUs.fi',
      likes: 10,
    }

    // use supertest to post blog
    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .send(postBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await helper.allBlogs()

    titles = response.map(blog => blog.title)

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('A secret to valid blog')
  })

  test('no likes -> default to 0', async () => {
    // makes all missing likes fields into likes: 0
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

    const initialBlogs = await helper.allBlogs()

    const users = await helper.usersInDb()
    const user = users[0]
    
    const loginCredentials = {
      username: user.username,
      password: 'strongpassword',
    }

    const login = await api
      .post('/api/login')
      .send(loginCredentials)
    
    const token = login.body.token
    const authorization = 'Bearer ' + token
  
    const postBlog = {
      author: 'Stephen King'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .send(postBlog)
      .expect(400)

    const response = await helper.allBlogs()
    // this one took quite long for some reason
    expect(response).toHaveLength(initialBlogs.length)
  }, 100000)
})

describe('deleting a blog', () => {
  test('delete a blog', async () => {

    const users = await helper.usersInDb()
    const user = users[0]
    
    const loginCredentials = {
      username: user.username,
      password: 'strongpassword',
    }

    const login = await api
      .post('/api/login')
      .send(loginCredentials)
    
    const token = login.body.token
    const authorization = 'Bearer ' + token

    const blogsBeforeDeletion = await helper.allBlogs()
    const deleteThis = blogsBeforeDeletion[0]

    await api
      .delete(`/api/blogs/${deleteThis.id}`)
      .set('Authorization', authorization)
      .expect(204)
    
    const blogsAfterDeletion = await helper.allBlogs()
    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)
    
  })
})

describe('blog edits', () => {
  // compares db 0th item likes to local 0th item blogs likes + 1
  test('updating likes', async () => {
    const allBlogs = await helper.allBlogs()
    const blogToUpdate = allBlogs[0]
    const blogToCompare = helper.initialBlogs[0]

    blogToUpdate.likes += 1
    
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
    
    const blogsAfter = await helper.allBlogs()
    const blogAfter = blogsAfter[0]

    expect(blogAfter.likes).toEqual(blogToCompare.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})