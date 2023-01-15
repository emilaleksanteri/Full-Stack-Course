import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { dispatchNotification } from '../reducers/notificationReducer'
import ShowRemove from './ShowRemve'
import { useNavigate } from 'react-router-dom'
import Comment from './Comment'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteBlog = () => {
    dispatch(removeBlog(blog))
    dispatch(dispatchNotification({
      notification: `${blog.title} removed`,
      type: 'success'
    }, 5))
    navigate('/')
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(dispatchNotification({
      notification: `${addedBy} appreciates the like`,
      type: 'success'
    }, 5))
  }

  if (!blog) {
    return <></>
  }

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  return (
    <div>
      <h1>{blog.title} | {blog.author}</h1>
      <a href={blog.url} >{blog.url}</a>
      <p id="likesField">
          Likes {blog.likes} <button onClick={handleLike}>like</button>
      </p>
      <p>added by: {addedBy}</p>
      <ShowRemove blog={blog} deleteBlog={deleteBlog} />
      <h3>comments</h3>
      <Comment id={blog.id} />
      {blog.comments.map((comment) => (
        <li key={comment.id} >{comment.comment}</li>
      ))}
    </div>
  )
}

export default BlogView