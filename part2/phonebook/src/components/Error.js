const Error = ({ message }) => {
    // style for error component
    const error = {
        color: 'red',
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
        <div style={error}>
            {message}
        </div>
    )
}

export default Error