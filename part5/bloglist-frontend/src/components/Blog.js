import { useState } from 'react'
import ShowRemove from './ShowRemve'
import propTypes from 'prop-types'

const Blog = ({ blog, likePost, removeBlog, user }) => {
  const [showMore, setShowMore] = useState(false)

  const showLess = {
    display: showMore ? 'none' : '',
    border: 'solid black',
    padding: '8px',
    marginBottom: '4px',
    marginTop: '4px'
  }

  // wanted to have different border for the object in view for seperation
  const showAll = {
    display: showMore ? '' : 'none',
    border: 'solid green',
    padding: '8px',
    marginBottom: '4px',
    marginTop: '4px'
  }

  const showMoreToggle = () => {
    setShowMore(!showMore)
  }

  const likeBlog = () => {
    blog.likes += 1
    likePost(blog) // function call for App
  }

  // really just a function to relay delete function call to ShowRemove from App
  const deleteBlog = () => {
    removeBlog(blog)
  }

  return (
    <div className='individualBlog'>
      <div style={showLess} >
        <p>{blog.title} | {blog.author} <button onClick={showMoreToggle}>view</button></p>
      </div>
      { /* shown after clicking view */ }
      <div style={showAll} className="expanded">
        <p>{blog.title} | {blog.author} <button onClick={showMoreToggle}>hide</button></p>
        <p>{blog.url}</p>
        <p id='likesField'>Likes {blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.user.username}</p>
        <ShowRemove user={user} blog={blog} deleteBlog={deleteBlog} />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  likePost: propTypes.func.isRequired,
  removeBlog: propTypes.func.isRequired
  // no user, changes state from null to object
}

export default Blog