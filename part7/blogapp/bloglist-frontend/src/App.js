import { useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/loginReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import { allUsers } from './reducers/usersReducer'
import UserPage from './components/UserPage'
import BlogView from './components/BlogView'

import { Routes, Route, useMatch, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.login)

  useEffect(() => {
    // initialize blogs and users
    dispatch(initialBlogs())
    dispatch(allUsers())
  }, [dispatch])

  // check local storage for token
  useEffect(() => {
    const userDetailsJSON = window.localStorage.getItem('localBloggappUser')

    if (userDetailsJSON) {
      const user = JSON.parse(userDetailsJSON)
      blogService.setToken(user.token) // token for services from local storage
      dispatch(setUser(user))
    }
  }, [])

  // get rid of current token in local storage
  const logoutUser = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('localBloggappUser')
    dispatch(logout())
  }

  const pageContentControls = () => {
    // show login if not logged in
    if (userAuth === null) {
      return <Login />
    }
  }

  // TO DO -> Make custom hook for useMatch
  // set up for users and user pages
  const users = useSelector((state) => state.users)
  const matchUser = useMatch('/users/:id')

  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  // set up for blogs and blogs page
  const blogs = useSelector((state) => state.blogs)
  const matchBlog = useMatch('/blogs/:id')

  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  // return for app
  return (
    <div className="relative">
      <div className="font-mono w-screen bg-yellow-400 opacity-50 hover:opacity-100 fixed top-0 flex p-4 md:text-md text-sm font-extrabold text-zinc-900 tracking-wider">
        <Link to={'/'}>
          <p className="mx-5 hover:underline hover:decoration-zinc-900 py-0.5">
            blogs
          </p>
        </Link>
        <Link to={'/users'}>
          <p className="hover:underline hover:decoration-zinc-900 py-0.5">
            users
          </p>
        </Link>
        {userAuth ? (
          <p className="ml-5">
            {userAuth.name} logged in{' '}
            <button
              onClick={logoutUser}
              className="border-2 border-zinc-900 text-md rounded-md hover:bg-zinc-900 hover:text-yellow-400 shadow-lg"
            >
              logout
            </button>
          </p>
        ) : null}
      </div>
      <h1 className="font-mono text-6xl p-5 font-extrabold text-zinc-100 text-center underline decoration-green-500 w-auto my-12">
        Blog App
      </h1>
      <Notification />
      {pageContentControls()}
      <Routes>
        <Route path="/users/:id" element={<UserPage user={user} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
