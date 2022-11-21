import Details from "./Details"

const Persons = ({persons, newSearch, removePerson}) => {

    // assigns contacts to a variable, if search field is empty, they are the same as persons
    // once user types something into search field, only contacts w matching will be assigned to variable
    const toShow = (newSearch.length === 0) ? persons :
      persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    
    return (
        <div>
      {toShow.map(person =>
        <Details key={person.id} name={person.name} 
        number={person.number} removePerson={removePerson} person={person} />
        )}
      </div>
    )
}

export default Persons