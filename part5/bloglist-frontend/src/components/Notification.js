const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  const notificationStyle = {
    border: 'solid green',
    borderRadius: '10px',
    backgroundColor: 'lightgrey',
    padding: '10px',
    fontSize: '20px',
    color: 'green'
  }

  return (
    <p style={notificationStyle}>{props.notification}</p>
  )
}

export default Notification