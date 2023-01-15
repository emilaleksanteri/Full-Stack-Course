const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// makes an http page
const server = http.createServer(app)

// localhost port to live in
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})