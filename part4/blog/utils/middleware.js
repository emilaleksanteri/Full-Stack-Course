const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

// lets us know what functions done w backend -> need to know whats going on
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  // missing required fields on POST
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  logger.error(error.message)
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token =  authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    } else {
      request.token = decodedToken
    }
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const user = await User.findById(request.token.id)
    request.user = user
  } else {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }


  next()
}

module.exports = {
    requestLogger,
    errorHandler,
    tokenExtractor,
    userExtractor,
}