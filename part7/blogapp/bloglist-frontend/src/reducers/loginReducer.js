import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    loginReducer(state, action) {
      return action.payload
    },
    logoutReducer(state) {
      state = null
      return state
    }
  }
})

export const login = loginCredentials => {
  return async dispatch => {
    const userAuth = await loginService.login(loginCredentials) // response w user auth
    window.localStorage.setItem('localBloggappUser', JSON.stringify(userAuth))
    blogService.setToken(userAuth.token)
    dispatch(loginReducer(userAuth))
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(logoutReducer())
  }
}

export const setUser = userCredentials => {
  return async dispatch => {
    dispatch(loginReducer(userCredentials))
  }
}

export const { loginReducer, logoutReducer } = loginSlice.actions
export default loginSlice.reducer