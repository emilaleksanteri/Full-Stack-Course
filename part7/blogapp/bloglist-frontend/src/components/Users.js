import { Link } from 'react-router-dom'

const User = (props) => {
  // num of blogs each user has
  const numberOfBlogs = props.user.blogs.length

  return (
    <tr>
      <td>
        <Link to={`/users/${props.user.id}`} >{props.user.name}</Link>
      </td>
      <td>{numberOfBlogs}</td>
    </tr>
  )
}

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user.id}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users