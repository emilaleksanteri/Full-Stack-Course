import { Link } from 'react-router-dom'

const User = (props) => {
  // num of blogs each user has
  const numberOfBlogs = props.user.blogs.length

  return (
    <tr className='hover:border-yellow-400 hover:border-2'>
      <td>
        <Link to={`/users/${props.user.id}`} className='text-zinc-100 tracking-wider px-6 hover:text-yellow-400' >{props.user.name}</Link>
      </td>
      <td className='text-center text-xl font-bold text-yellow-400'>{numberOfBlogs}</td>
    </tr>
  )
}

const Users = ({ users }) => {
  return (
    <div className='my-5'>
      <h2 className='text-4xl text-zinc-100 text-center my-8 font-extrabold font-mono underline decoration-yellow-400'>Users</h2>
      <div className='rounded-md border-yellow-400 shadow-lg shadow-yellow-400/50 border-2 w-96 p-5 m-auto py-10'>
        <table className='m-auto'>
          <thead>
            <tr>
              <th className='text-xl font-bold text-yellow-400 px-6'>Users</th>
              <th className='text-xl font-bold text-yellow-400 px-6'>blogs created</th>
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
      </div>
    </div>
  )
}

export default Users