import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {

    const handleChange = (event) => {
      const filterValue = event.target.value
      props.setFilter(filterValue)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setFilter: filterValue => {
        dispatch(setFilter(filterValue))
      }
    }
  }
  
  const connectedFilter = connect(
    null,
    mapDispatchToProps
  )(Filter)
  
  export default connectedFilter