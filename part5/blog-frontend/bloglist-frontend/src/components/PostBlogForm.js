import { useState } from "react"

const PostBlogForm = ({ postBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "",})

  const onChangePostForm = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const blogPostHandler = (event) => {
    event.preventDefault()
    postBlog(newBlog)
    setNewBlog({ title: "", author: "", url: "",})
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
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newBlog.author}
            name='author'
            onChange={onChangePostForm}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newBlog.url}
            name='url'
            onChange={onChangePostForm}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default PostBlogForm