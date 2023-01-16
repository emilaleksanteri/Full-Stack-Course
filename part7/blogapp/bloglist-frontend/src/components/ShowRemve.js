import propTypes from 'prop-types'
import { useSelector } from 'react-redux'

const ShowRemove = (props) => {
  const user = useSelector((state) => state.login)

  if (user !== null && props.blog.user.username === user.username) {
    return (
      <button
        id="removePost"
        onClick={props.deleteBlog}
        className="border-2 border-rose-500 rounded-md text-rose-500 hover:text-zinc-900 py-2 font-bold
      w-24 my-4 bg-zinc-900 hover:bg-rose-500 text-xl shadow-lg shadow-rose-500/20 hover:shadow-rose-500/50"
      >
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
