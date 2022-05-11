import { useState } from 'react'

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

const ContactList = ({ persons, filterText }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase()
        .includes(filterText.toLowerCase()))
        .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>

  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState("")

  const clearFields = () => {
    setNewName("")
    setNewNumber("")
  }
  const addPerson = (event) => {
    event.preventDefault()

    // check if person already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} already exists`)
      clearFields()
      return
    }

    const personObj = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObj))
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
      
      <ContactList persons={persons} filterText={filterText} />
      
    </div>
  )
}

export default App