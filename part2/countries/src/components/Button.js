const Button = (props) => {
    // creates a button element
    return(
    <button onClick={props.onClick}>{props.text}</button>
    )
}

export default Button