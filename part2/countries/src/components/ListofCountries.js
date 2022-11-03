import Button from "./Button"

// changes state of showOne to false -> causes the function in Display to change
const ListofCountries = (props) => {
  const changeState = () => {
    props.setShowOne(!props.showOne)
  }

  // sets the country to be shown in Display element to be this country only
  const setCountry = () => {
  props.setShowCountry(props.country)
  }

  return (
    <div>
      <p>{props.name} <Button onClick={() => {changeState(); setCountry();}} text='show' /></p>
    </div>
  )
}

export default ListofCountries