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
let notificationId // keeps track of current id of notification clearing timeout
export const settingNotification = (notificationToSet, time) => {
  return dispatch => {
    clearTimeout(notificationId) // removes the timout call from previous one -> from stored notificationId
    dispatch((setNotification(notificationToSet)))
    notificationId = setTimeout(() => {dispatch(removeNotification())}, time*1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer