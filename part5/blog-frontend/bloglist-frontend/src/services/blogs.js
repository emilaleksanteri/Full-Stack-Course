import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = async newBlog => {
  // create header for post
  const authHeader = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newBlog, authHeader)
  return response.data
}

export default { getAll, setToken, post }