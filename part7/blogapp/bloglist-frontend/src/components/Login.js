import { useDispatch } from 'react-redux'
import { dispatchNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const Login = () => {
  const dispatch = useDispatch()

  // call for login function in app
  const handleLoginForm = (event) => {
    event.preventDefault()
    const loginCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    dispatch(login(loginCredentials))

    dispatch(dispatchNotification({
      notification: `welcome ${loginCredentials.username}`,
      type: 'success'
    }, 5))
  }

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleLoginForm}>
        <div>
          username:
          <input
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </>
  )
}
export default Login