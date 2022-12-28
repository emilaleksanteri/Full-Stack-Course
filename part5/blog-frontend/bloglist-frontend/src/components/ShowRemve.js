const ShowRemove = (props) => {
    if (props.user !== null && props.blog.user.username === props.user.username) {
      return (
        <button onClick={props.deleteBlog}>remove</button>
      )
    }
  }

export default ShowRemove