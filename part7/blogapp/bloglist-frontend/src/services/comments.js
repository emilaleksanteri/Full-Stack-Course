import axios from 'axios'
const baseUrl = '/api/comments'

const postComment = async (comment, blogId) => {
  const commentToAdd = {
    comment: comment,
    blog: blogId
  }

  const response = await axios.post(baseUrl, commentToAdd)
  return response.data
}

export default { postComment }