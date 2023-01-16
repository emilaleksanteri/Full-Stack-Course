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

    dispatch(
      dispatchNotification(
        {
          notification: 'comment added',
          type: 'success',
        },
        5
      )
    )
  }
  return (
    <form onSubmit={handleComment} className="mx-10 text-zinc-100">
      <input
        className="bg-zinc-900 border-2 border-zinc-600 text-green-500 p-2 focus:ring focus:ring-green-500"
        type="text"
        name="comment"
        placeholder="Comment Here"
      />
      <button
        type="submit"
        className="mx-4 text-xl font-extrabold hover:text-green-500 border-2 rounded-md
       border-zinc-600 hover:border-green-500 p-1.5"
      >
        post
      </button>
    </form>
  )
}

export default Comment
