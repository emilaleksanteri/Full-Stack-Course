const Error = (props) => {
  if (props.error === null) {
    return null
  }

  const errorStyle = {
    border: 'solid red',
    borderRadius: '10px',
    backgroundColor: 'lightgrey',
    padding: '10px',
    fontSize: '20px',
    color: 'red'
  }

  return (
    <p style={errorStyle}>{props.error}</p>
  )
}

export default Error