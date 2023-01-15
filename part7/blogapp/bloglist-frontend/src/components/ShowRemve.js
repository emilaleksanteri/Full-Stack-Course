import propTypes from 'prop-types'
import { useSelector } from 'react-redux'

const ShowRemove = (props) => {
  const user = useSelector(state => state.login)

  if (user !== null && props.blog.user.username === user.username) {
    return (
      <button id="removePost" onClick={props.deleteBlog}>
        remove
      </button>
    )
  } else {
    return null
  }
}

ShowRemove.propTypes = {
  deleteBlog: propTypes.func.isRequired,
}

export default ShowRemove
