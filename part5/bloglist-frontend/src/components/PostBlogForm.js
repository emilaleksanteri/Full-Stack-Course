import { useState } from 'react'
import PropTypes from 'prop-types'

const PostBlogForm = ({ postBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', })

  const onChangePostForm = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const blogPostHandler = (event) => {
    event.preventDefault()
    postBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '', })
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={blogPostHandler} >
        <div>
          title:
          <input
            type='text'
            value={newBlog.title}
            name='title'
            onChange={onChangePostForm}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newBlog.author}
            name='author'
            onChange={onChangePostForm}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newBlog.url}
            name='url'
            onChange={onChangePostForm}
            placeholder='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

PostBlogForm.propTypes = {
  postBlog: PropTypes.func.isRequired
}

export default PostBlogForm