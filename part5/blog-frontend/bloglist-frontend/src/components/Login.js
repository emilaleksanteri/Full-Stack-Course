const Login = ({ username, password, loginUser, onChangeLogin }) => {
 return (
    <>
      <h2>Log in</h2>
      <form onSubmit={loginUser}>
        <div>
          username:
          <input
            type='text'
            value={username}
            name='username'
            onChange={onChangeLogin}
          />
        </div>
        <div>
          password:
          <input
            type='password'
            value={password}
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