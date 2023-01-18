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
    dispatch(
      dispatchNotification(
        {
          notification: `${blog.title} removed`,
          type: 'success',
        },
        5
      )
    )
    navigate('/')
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(
      dispatchNotification(
        {
          notification: `${addedBy} appreciates the like`,
          type: 'success',
        },
        5
      )
    )
  }

  if (!blog) {
    return <></>
  }

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  return (
    <div className="w-auto">
      <h1 className="md:text-6xl text-2xl mx-10 my-5 text-zinc-50 tracking-wider">
        {blog.title}
      </h1>
      <p className="md:text-3xl text-lg mx-10 text-zinc-50 tracking-wider underline decoration-green-500">
        by {blog.author}
      </p>
      <div className="mx-10 my-5 text-zinc-50">
        <a
          href={blog.url}
          className="text-green-500 md:text-lg tracking-wider hover:text-yellow-400 text-xs"
        >
          {blog.url}
        </a>
        <div className="flex">
          <p className=" text-2xl tracking-wide font-extrabold flex-none my-4">
            Likes:{' '}
          </p>
          <p className="text-green-500 flex-initial text-3xl font-extrabold my-3 mx-4 underline decoration-yellow-400">
            {blog.likes}
          </p>
          <button
            onClick={handleLike}
            className="flex-initial text-4xl m-1 my-2 w-12 h-12 text-zinc-100
           hover:text-green-500 border-2 rounded-md border-zinc-600 hover:border-green-500"
          >
            ♥
          </button>
        </div>
        <p className="underline decoration-yellow-400 tracking-wide font-bold">
          Added by: {addedBy}
        </p>
        <ShowRemove blog={blog} deleteBlog={deleteBlog} />
      </div>
      <div className="my-10">
        <h3 className="mx-10 text-zinc-100 text-2xl tracking-wide font-extrabold my-4">
          Comments
        </h3>
        <Comment id={blog.id} />
        <div className="my-5">
          {blog.comments.map((comment) => (
            <ul
              key={comment.id}
              className="mx-10 text-zinc-100 hover:text-green-500 my-4 border-2 w-72 p-2 tracking-wide
             rounded-md border-zinc-600 hover:border-green-500 shadow-lg"
            >
              {comment.comment}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogView
