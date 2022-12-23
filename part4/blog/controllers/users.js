const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs',
    { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).json({
      error: 'missing username or password'
    })
  }

  // checks for no duplicate usernames
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  // function to check if password includes numbers and characters
  function checkCharacters(charactersArray, password) {
    if (!charactersArray.some(character => password.includes(character))) {
      return response.status(400).json({
        error: 'password needs to include at least a one number and special character'
      })
    }
  }

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const specialCharacters = [' ','!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '/', ']', '^', '_', '`', '{', '|', '}', '~']

  checkCharacters(numbers, password)
  checkCharacters(specialCharacters, password)

  // limit on password length
  if (password.length < 3) {
    return response.status(400).json({
      error: 'password not long enough, minimum 3 characters'
    })
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: 'username not long enough, minimum 3 characters'
    })
  }

  // hash password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter