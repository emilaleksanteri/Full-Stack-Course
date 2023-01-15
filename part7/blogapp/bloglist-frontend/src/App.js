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

import {
  Routes,
  Route,
  useMatch,
  Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const userAuth = useSelector(state => state.login)

  useEffect(() => { // initialize blogs and users
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
  const users = useSelector(state => state.users)
  const matchUser = useMatch('/users/:id')

  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  // set up for blogs and blogs page
  const blogs = useSelector(state => state.blogs)
  const matchBlog = useMatch('/blogs/:id')

  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const menuDivStyle = {
    display: 'flex',
    background: 'lightgray'
  }

  const padding = {
    padding: 5
  }

  // return for app
  return (
    <>
      <div style={menuDivStyle}>
        <Link style={padding} to={'/'}><p>blogs</p></Link>
        <Link style={padding} to={'/users'}><p>users</p></Link>
        {userAuth
          ? <p style={padding} >{userAuth.name} logged in <button onClick={logoutUser}>logout</button></p>
          : null
        }
      </div>
      <h1>Blog App.</h1>
      <Notification />
      {pageContentControls()}
      <Routes>
        <Route path="/users/:id" element={<UserPage user={user} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
      </Routes>
    </>
  )
}

export default App