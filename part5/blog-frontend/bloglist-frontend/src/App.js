import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import PostBlogForm from './components/PostBlogForm'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [login, setLogin] = useState({ username: '', password: '',})
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "",})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const onChangeLogin = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value })
  }

  // will handel passing login info
  // recieves user info from backend, sets it as user useState
  const loginUser = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(login)
      // set user info to local storage for user
      window.localStorage.setItem(
        'localUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setLogin('')
      
      setNotification(`welcome ${user.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (excpetion) {
      console.log(excpetion)
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const logoutUser = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('localUser')
    setUser(null)
  }

  // look for user in local storage
  useEffect(() => {
    const userDetailsJSON = window.localStorage.getItem('localUser')

    if (userDetailsJSON) {
      const user = JSON.parse(userDetailsJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  // handle inputs from object -> form
  const onChangePostForm = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  // post blog to db
  const postBlog = async (event) => {
    event.preventDefault()

    try {
      const blogNew = await blogService.post(newBlog)
      setNewBlog({ title: "", author: "", url: "",})
      setBlogs(blogs.concat(blogNew))
      setNotification(`${blogNew.title} ${blogNew.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (excpetion) {
      setError(`post failed, missing fields`)
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }

  const pageContentControls = () => {
    // show login if not logged in
    if (user === null) {
      return <Login loginUser={loginUser} username={login.username} password={login.password} setLogin={setLogin} onChangeLogin={onChangeLogin} />
    }

    // default 
    return (
      <div>
        <p>
          {user.name} logged in
          <button onClick={logoutUser}>logout</button>
        </p>
        <PostBlogForm postBlog={postBlog} newBlog={newBlog} setNewBlog={setNewBlog} onChangePostForm={onChangePostForm} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <>
      <h1>Blog App.</h1>
      <Notification notification={notification} />
      <Error error={error} />
      {pageContentControls()}
    </>
  )
}

export default App
