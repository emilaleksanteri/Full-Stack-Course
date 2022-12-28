import propTypes from 'prop-types'

const ShowRemove = (props) => {
  if (props.user !== null && props.blog.user.username === props.user.username) {
    return (
      <button onClick={props.deleteBlog}>remove</button>
    )
  }
}

ShowRemove.propTypes = {
  deleteBlog: propTypes.func.isRequired
}

export default ShowRemove