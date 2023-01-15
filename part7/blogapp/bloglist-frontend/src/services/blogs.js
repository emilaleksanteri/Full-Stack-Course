import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const post = async (newBlog) => {
  // create header for post
  const authHeader = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newBlog, authHeader)
  return response.data
}

const update = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async (id) => {
  const authHeader = { headers: { Authorization: token } }

  await axios.delete(`${baseUrl}/${id}`, authHeader)
}

export default { getAll, setToken, post, update, remove }
