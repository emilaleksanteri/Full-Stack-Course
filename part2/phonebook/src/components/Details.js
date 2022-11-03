const Details = ({ name, number, removePerson, person}) => {
    // button takes in the id of the person object passed here on the button click
    return (
      <p>{name} {number}
      <button onClick={()=>removePerson(person.id)}>delete</button>
      </p>
    )
  }

export default Details