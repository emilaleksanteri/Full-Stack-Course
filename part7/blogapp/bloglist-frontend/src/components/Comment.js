import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { dispatchNotification } from '../reducers/notificationReducer'


const Comment = ({ id }) => {
  const dispatch = useDispatch()

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(commentBlog(comment, id))
    event.target.comment.value = ''

    dispatch(dispatchNotification({
      notification: 'comment added',
      type: 'success'
    }, 5))

  }
  return (
    <form onSubmit={handleComment}>
      <input
        type='text'
        name='comment'
        placeholder='comment'
      />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default Comment