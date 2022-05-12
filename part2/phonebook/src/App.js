import { useState, useEffect } from 'react'
import personService from "./services/persons"

const Filter = ({ action }) => {
  return (
    <form>
      <div>
        filter shown contacts <input onChange={action} />
      </div>
    </form>
  )
}

const PersonForm = ({ nameAction, newName, numberAction, newNumber, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={nameAction} value={newName} />
      </div>
      <div>
        number: <input onChange={numberAction} value={newNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const ContantListElement = ({ person, setPersons, persons }) => {

  const handleRemoveButton = (event) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      console.log("delete", person)
      event.preventDefault()
      personService.removePerson(person.id).then(
        setPersons(persons.filter(p => p.id !== person.id))
      )
    }
  }

  console.log("contanctListElement", persons)
  return (<div>
    {person.name} {person.number}
    <button onClick={handleRemoveButton}>remove</button>
  </div>

  )
}

const ContactList = ({ persons, filterText, setPersons }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase()
        .includes(filterText.toLowerCase()))
        .map(person => <ContantListElement person={person} setPersons={setPersons} persons={persons} />)}

    </div>

  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState("")

  useEffect(() => {
    personService.getAll().then(data => {
      setPersons(data)
    })
  }, [])


  const clearFields = () => {
    setNewName("")
    setNewNumber("")
  }
  const addPerson = (event) => {
    event.preventDefault()

    // check if person already exists
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} already exists. Want to replace the old number with a new one?`)) {
        // create new object by finding and copying the already existing object
        const newPerson = { ...persons.find(p => p.name === newName), number: newNumber }

        // update persons
        personService.updatePerson(newPerson.id, newPerson).then(
          response => {
            setPersons(persons.map(person => person.id !== newPerson.id ? person : response))
          }
        )
      }
      clearFields()
      return
    }

    const personObj = {
      name: newName,
      number: newNumber
    }
    personService.create(personObj).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })

    clearFields()
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter action={handleFilterChange} />

      <h3>Add new contact</h3>

      <PersonForm
        nameAction={handleNameChange} newName={newName}
        numberAction={handleNumberChange} newNumber={newNumber}
        addPerson={addPerson} />

      <h2>Numbers</h2>

      <ContactList persons={persons} filterText={filterText} setPersons={setPersons} />

    </div>
  )
}

export default App