const UserPage = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="text-center">
      <h2 className='md:text-6xl text-2xl mx-10 my-5 text-zinc-50 tracking-wider underline decoration-yellow-400'>{user.name}</h2>
      <h3 className='md:text-3xl text-lg mx-10 text-zinc-50 tracking-wider'>Added blogs:</h3>
      {user.blogs.map((blog) => (
        <ul key={blog.id} className='m-auto text-zinc-100 hover:text-yellow-400 my-4 border-2 w-72 p-2 tracking-wide
        rounded-md border-zinc-600 hover:border-yellow-400 shadow-lg'
        >
          {blog.title}
        </ul>
      ))}
    </div>
  )
}

export default UserPage