import { useRef } from 'react'
import Blog from './Blog'
import ToggleVisibility from './ToggleVisibility'
import { useSelector } from 'react-redux'
import PostBlogForm from './PostBlogForm'

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef() // used to hide new blog form once new one created

  const user = useSelector(state => state.login)

  // sort highest to lowest blog likes, give to blog map function
  const sortByLikes = [...blogs].sort((first, second) => second.likes - first.likes)

  const showCreate = () => {
    if (user === null) {
      return null
    }

    return (
      <div>
        <ToggleVisibility buttonLabel="new blog" ref={blogFormRef}>
          <PostBlogForm blogFormRef={blogFormRef} />
        </ToggleVisibility>
      </div>
    )
  }

  return (
    <div>
      {showCreate()}
      <div >
        {sortByLikes.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default Blogs