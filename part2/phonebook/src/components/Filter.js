const Filter = (props) => {
    return (
        <div>
            {/* filter input field */}
            {props.text} <input
            value={props.value}
            onChange={props.onChange}
            />
        </div>
    )
}

export default Filter