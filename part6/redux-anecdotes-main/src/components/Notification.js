import { connect } from "react-redux"

const Notification = (props) => {

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === null) {
    style = {
      border: 'none'
    }
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotifications = connect(mapStateToProps)(Notification)
export default connectedNotifications