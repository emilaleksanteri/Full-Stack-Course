const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// so that we can see if connection request went through
logger.info('connecting to', config.MONGODB_URI)

// establich connection to our db
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    // we know if connection === good
    logger.info('Connected to MongoDB')
  })
  // need to know what went wrong
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// for frontend so that app can run at two different localhost addresses
app.use(cors())
// add build once frontend

// turns json from db into usable objects for us
app.use(express.json())

// whats going on
app.use(middleware.requestLogger)

// gets token after login
app.use(middleware.tokenExtractor)

// user signup
app.use('/api/users', usersRouter)

// handels user login
app.use('/api/login', loginRouter)

// path in localhost has to be established to router
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/reset')
  app.use('/api/testing', testingRouter)
}

// add middleware for endpoint for individual blogs if needed later
app.use(middleware.errorHandler)

module.exports = app