const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

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

// path in localhost has to be established to router
app.use('/api/blogs', blogRouter)

// add middleware for endpoint for individual blogs if needed later
app.use(middleware.errorHandler)

module.exports = app