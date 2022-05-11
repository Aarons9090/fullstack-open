import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "123123"
    },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const clearFields = () =>{
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App