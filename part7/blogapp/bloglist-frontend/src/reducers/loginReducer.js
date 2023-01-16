import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { dispatchNotification } from './notificationReducer'

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
    },
  },
})

// notification set here to avoid a visual bug in case of an error
export const login = (loginCredentials) => {
  return async (dispatch) => {
    try {
      const userAuth = await loginService.login(loginCredentials) // response w user auth
      window.localStorage.setItem('localBloggappUser', JSON.stringify(userAuth))
      blogService.setToken(userAuth.token)
      dispatch(loginReducer(userAuth))
      dispatch(
        dispatchNotification(
          {
            notification: `Welcome ${loginCredentials.username}`,
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      dispatch(
        dispatchNotification(
          {
            notification: 'Invalid username or password',
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutReducer())
  }
}

export const setUser = (userCredentials) => {
  return async (dispatch) => {
    dispatch(loginReducer(userCredentials))
  }
}

export const { loginReducer, logoutReducer } = loginSlice.actions
export default loginSlice.reducer
