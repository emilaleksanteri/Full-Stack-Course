import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className='bg-zinc-800 border-4 border-green-800 p-5 mx-5 my-4
     shadow-lg cursor-pointer text-zinc-100 text-lg font-medium rounded-md
      hover:bg-green-500 hover:shadow-green-500/50 hover:border-green-500'
    >
      <Link to={`/blogs/${blog.id}`}>{blog.title} | {blog.author}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired
}

export default Blog
