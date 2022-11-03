const Search = (props) => {
    // input field for searches
    return (
        <div>
            {props.text} <input
            value={props.value}
            onChange={props.onChange}
            />
        </div>
    )
}

export default Search