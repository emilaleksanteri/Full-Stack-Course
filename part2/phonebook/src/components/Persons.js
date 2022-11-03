import Details from "./Details"

const Persons = ({persons, newSearch, removePerson}) => {

    // variable for making persons object array copy that only shows names with same string(s) as in search
    // sets all search terms to be in lowercase, not case sensitive anymore
    var filter = persons.filter(person => 
      person.name.toLowerCase().includes(newSearch))
      
    return (
        <div>
      {filter.map(person =>
        <Details key={person.id} name={person.name} 
        number={person.number} removePerson={removePerson} person={person} />
        )}
      </div>
    )
}

export default Persons