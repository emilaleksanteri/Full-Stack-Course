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
    <>
      <h2>Create New</h2>
      <form onSubmit={blogPostHandler}>
        <div>
          title:
          <input
            type="text"
            name="title"
            placeholder="title"
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            placeholder="author"
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            placeholder="url"
            id="url"
          />
        </div>
        <button id="postBlog-btn" type="submit">
          create
        </button>
      </form>
    </>
  )
}

export default PostBlogForm
