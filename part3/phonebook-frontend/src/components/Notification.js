const Notification = ({ message }) => {
    // style for notification component
    const change = {
        color: 'green',
        fontSize: 20,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div style={change}>
            {message}
        </div>
    )
}

export default Notification