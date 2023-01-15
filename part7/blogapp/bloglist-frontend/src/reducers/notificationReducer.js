import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload.notification
      const notificationType = action.payload.type
      state = { notification: notification, type: notificationType }
      return state
    },
    removeNotification(state) {
      state = null
      return state
    }
  }
})

let notificationId
export const dispatchNotification = (notificationToSet, time) => {
  return dispatch => {
    clearTimeout(notificationId) // removes the timout call from previous one -> from stored notificationId
    dispatch((setNotification(notificationToSet)))
    notificationId = setTimeout(() => {dispatch(removeNotification())}, time*1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer