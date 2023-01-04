import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
    const notification = action.payload
    state = notification
    return state
    },
    removeNotification(state, action) {
      state = initialState
      return state
    }
  }
})

export const settingNotification = (notification, time) => {
  return dispatch => {
    dispatch((setNotification(notification)))
    setTimeout(() => {dispatch(removeNotification())}, time*1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer