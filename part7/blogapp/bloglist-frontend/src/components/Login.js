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
      password: event.target.password.value,
    }

    dispatch(login(loginCredentials))

    dispatch(
      dispatchNotification(
        {
          notification: `welcome ${loginCredentials.username}`,
          type: 'success',
        },
        5
      )
    )
  }

  return (
    <div className="my-10 p-4 rounded-md border-zinc-100 shadow-lg shadow-zinc-500/50 hover:shadow-green-400/50 w-96 m-auto">
      <h2 className="text-zinc-100 mx-5 text-2xl font-bold">Log in</h2>
      <form
        onSubmit={handleLoginForm}
        className="text-zinc-100 mx-5 my-8 font-medium flex flex-col"
      >
        <div>
          username:
          <input
            className="bg-zinc-900 border-2 border-zinc-600 mx-[4.8px] my-1"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          password:
          <input
            className="bg-zinc-900 border-2 border-zinc-600 mx-2 my-1"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button
          id="login-btn"
          type="submit"
          className="p-1 border-2 border-green-500 rounded-md
         w-24 my-4 bg-green-700 hover:bg-green-500 text-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/50"
        >
          login
        </button>
      </form>
    </div>
  )
}
export default Login
