import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import PostBlogForm from './components/PostBlogForm'
import Notification from './components/Notification'
import Error from './components/Error'
import ToggleVisibility from './components/ToggleVisibility'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // will handel passing login info
  // recieves user info from backend, sets it as user useState
  const loginUser = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      // set user info to local storage for user
      window.localStorage.setItem(
        'localBloggappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token) // pass token to services to use
      setUser(user)

      setNotification(`welcome ${user.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 4000)

    } catch (excpetion) {
      console.log(excpetion)
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  // check local storage for token
  useEffect(() => {
    const userDetailsJSON = window.localStorage.getItem('localBloggappUser')

    if (userDetailsJSON) {
      const user = JSON.parse(userDetailsJSON)
      blogService.setToken(user.token) // token for services from local storage
      setUser(user)
    }
  }, [])

  // get rid of current token in local storage
  const logoutUser = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('localBloggappUser')
    setUser(null)
  }

  // post blog to db
  const postBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleState()
      const blogNew = await blogService.post(blogObject)
      setBlogs(blogs.concat(blogNew))

      setNotification(`${blogNew.title} by ${blogNew.author} added`) // indication to the user
      setTimeout(() => {
        setNotification(null)
      }, 3000)

    } catch (excpetion) {
      setError('post failed, missing fields')
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }

  const likePost = async (updatedBlogObject) => {
    try {
      const id = updatedBlogObject.id // get id of post to like
      await blogService.update(updatedBlogObject, id) // send update via PUT
      setNotification(`${updatedBlogObject.user.username} appreciates the like`) // show that like was succesful
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    } catch (excpetion) {
      setError('like failed..')
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }

  const removeBlog = async (deleteBlogObject) => {
    try {
      const id = deleteBlogObject.id // get id from passed object

      if (window.confirm(`Remove ${deleteBlogObject.title} by ${deleteBlogObject.author}`)) {
        await blogService.remove(id)
        const newBlogs = await blogService.getAll() // get updated blogs to display from db
        setBlogs(newBlogs)

        setNotification(`${deleteBlogObject.title} removed`) // let user know about success
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      }

    } catch (excpetion) {
      setError('something went wrong')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const pageContentControls = () => {
    // show login if not logged in
    if (user === null) {
      return <Login loginUser={loginUser} />
    }

    // default
    return (
      <div>
        <p>
          {user.name} logged in
          <button onClick={logoutUser}>logout</button>
        </p>
        <ToggleVisibility buttonLabel='new blog' ref={blogFormRef} >
          <PostBlogForm postBlog={postBlog} />
        </ToggleVisibility>
      </div>
    )
  }

  // sort highest to lowest blog likes, give to blog map function
  const sortByLikes = blogs.sort((first, second) => second.likes - first.likes)

  // return for app
  return (
    <>
      <h1>Blog App.</h1>
      <Notification notification={notification} />
      <Error error={error} />
      {pageContentControls()}
      <div id='blogsList'>
        {sortByLikes.map(blog =>
          <Blog key={blog.id} blog={blog} likePost={likePost} removeBlog={removeBlog} user={user}/>
        )}
      </div>
    </>
  )
}

export default App
