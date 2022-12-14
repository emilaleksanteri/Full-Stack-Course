require('dotenv').config()
// port from env
const PORT = process.env.PORT
// secret db url from env
// if testing, use test db address
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}