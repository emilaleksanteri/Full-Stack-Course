import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogRow = {
    border: 'solid black',
    padding: '8px',
    marginBottom: '4px',
    marginTop: '4px',
  }


  return (
    <div style={blogRow}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} | {blog.author}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired
}

export default Blog
