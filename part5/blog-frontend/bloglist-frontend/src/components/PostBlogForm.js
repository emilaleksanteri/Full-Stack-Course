const PostBlogForm = ({ postBlog, newBlog, setNewBlog, onChangePostForm }) => {
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={postBlog} >
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