import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/people'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  // render page
  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // When adding a person, first prevent page from refreshing upon submission, then we create a person object
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // checks if a name is already created
    // creates an array from persons arrays objects
    const names = Array.from(persons, x => x.name)

    // if the value that the user inputted is already in the array, we do not let the user to add the value
    if (names.find(name => name === newName)) {
      window.confirm(newName + ' is already added to phonebook, replace phone number?')
      
      // function that returns person object with corresponding matching name
      function rightPerson(details) {
        return details.name === newName
      }
      // finds id of matching name object
      const id = persons.find(rightPerson).id

      // index of object in array for replacing field on persons
      const index = persons.findIndex(person => person.id === id)

      //updates matching objects phone # details
      peopleService
        .update(id, personObject)
        .then(updatedPerson => {
          persons[index] = updatedPerson
          setNewName('')
          setNewNumber('')
          setNotification(
            `'${persons[index].name}' number updated`
          )
        })
        // if unable to update (person does not exist), we give an error message
        .catch(error => {
          setError(
            `Information of '${persons[index].name}' has already been remobed from server`
          )
        })
          setTimeout(() => {
            setNotification(null)
            setError(null)
          }, 2000)
      }

    // if value not found, we concatinate it into persons array
    else {
    // Addin new person to json server via post method
    // We set person useState with setPersons, the new state will be adding a new person object into our persons array
    // new object being personObject created on our addPerson function, so on form submission
    peopleService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(
          `Added '${personObject.name}'`
        )
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
    }
  }

  // removes person from database if button is clicked
  // creates a popup to make user confirm their choices
  //--> if ok, person is removed and list gets updates on screen via getAll method
  const removePerson = id => {
    if (window.confirm(`Delete ${persons[id - 1].name}?`)){
      peopleService
        .remove(id)
        setPersons(persons.filter(p => p.id !== id))
        setNotification(
          `'${persons[id - 1].name}' Removed`
        )}
        
      setTimeout(() => {
      setNotification(null)
      }, 2000)
    }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />

      <Filter text='filter shown with' 
        value={newSearch} 
        onChange={(event) => 
          setNewSearch(event.target.value)}
         />

      <h3>add a new</h3>

      <PersonForm name='name: ' number='number: ' 
        nameValue={newName} numberValue={newNumber}
        nameChange={(event) =>
          setNewName(event.target.value)}
        numberChange={(event) =>
          setNewNumber(event.target.value)}
        addPerson={addPerson}
        />

      <h3>Numbers</h3>

      <Persons persons={persons} newSearch={newSearch} removePerson={removePerson} />
    </div>
  )
}

export default App