import { useState } from "react"

const Login = ({ loginUser }) => {
  const [login, setLogin] = useState({ username: '', password: '',})

  const onChangeLogin = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value })
  }

  // call for login function in app
  const handleLoginForm = (event) => {
    event.preventDefault()
    loginUser(login)
    setLogin({ username: '', password: '',})
  }

 return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleLoginForm}>
        <div>
          username:
          <input
            type='text'
            value={login.username}
            name='username'
            onChange={onChangeLogin}
          />
        </div>
        <div>
          password:
          <input
            type='password'
            value={login.password}
            name='password'
            onChange={onChangeLogin}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
 )
}

export default Login