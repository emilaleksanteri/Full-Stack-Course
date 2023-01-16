import { useDispatch } from 'react-redux'
import { postBlog } from '../reducers/blogReducer'
import { dispatchNotification } from '../reducers/notificationReducer'

const PostBlogForm = (props) => {
  const dispatch = useDispatch()

  const blogPostHandler = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    dispatch(postBlog(blogObject))

    dispatch(dispatchNotification({
      notification: `${blogObject.title} added`,
      type: 'success'
    }, 5))

    // reset input field
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.blogFormRef.current.toggleState()
  }

  return (
    <div className='mx-5'>
      <h2 className='my-2 text-4xl text-zinc-100 font-mono underline decoration-green-500'>
        Create New
      </h2>
      <form onSubmit={blogPostHandler} className='flex flex-col text-zinc-100'>
        <div className='my-1'>
          title:
          <input className='mx-8 bg-zinc-900 border-2 border-zinc-600 p-1'
            type="text"
            name="title"
            placeholder="title"
            id="title"
          />
        </div>
        <div className='my-1'>
          author:
          <input className='mx-3 bg-zinc-900 border-2 border-zinc-600 p-1'
            type="text"
            name="author"
            placeholder="author"
            id="author"
          />
        </div>
        <div className='my-1'>
          url:
          <input className='mx-10 bg-zinc-900 border-2 border-zinc-600 p-1'
            type="text"
            name="url"
            placeholder="url"
            id="url"
          />
        </div>
        <button id="postBlog-btn" type="submit" className='w-64 border-2 text-xl text-zinc-100 font-extrabold hover:text-green-500 border-2 rounded-md
        border-green-500 hover:border-green-500 p-2 my-4 shadow-lg shadow-green-500/20 hover:shadow-green-500/50 mb-8'
        >
          create
        </button>
      </form>
    </div>
  )
}

export default PostBlogForm
