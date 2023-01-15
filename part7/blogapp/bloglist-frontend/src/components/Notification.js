import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  let notificationStyle = {
    border: 'solid green',
    borderRadius: '10px',
    backgroundColor: 'lightgrey',
    padding: '10px',
    fontSize: '20px',
    color: 'green',
  }

  if (notification.type === 'error') {
    notificationStyle = {
      border: 'solid red',
      borderRadius: '10px',
      backgroundColor: 'lightgrey',
      padding: '10px',
      fontSize: '20px',
      color: 'red',
    }
  }

  return (
    <p id="notification" style={notificationStyle}>
      {notification.notification}
    </p>
  )
}

export default Notification
