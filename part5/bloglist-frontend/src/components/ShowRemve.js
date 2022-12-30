import propTypes from 'prop-types'

const ShowRemove = (props) => {
  if (props.user !== null && props.blog.user.username === props.user.username) {
    return (
      <button id='removePost' onClick={props.deleteBlog}>remove</button>
    )
  } else if (props.user !== null) {
    return (
      <button id='removePost' onClick={props.deleteBlog}>remove</button>
    )
  } else {
    return null
  }
}

ShowRemove.propTypes = {
  deleteBlog: propTypes.func.isRequired
}

export default ShowRemove