import { useState, useEffect } from 'react'
import personService from "./services/persons"
import "./index.css"

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
      event.preventDefault()
      personService.removePerson(person.id).then(
        setPersons(persons.filter(p => p.id !== person.id))
      )
    }
  }

  return (<div className="listElement" key="1">
    {person.name} {person.number}
    <button onClick={handleRemoveButton}>remove</button>
  </div>

  )
}

const ContactList = ({ persons, filterText, setPersons }) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase()
          .includes(filterText.toLowerCase()))
        .map(person => <ContantListElement key={person.id} person={person} setPersons={setPersons} persons={persons} />)}

    </div>

  )
}

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div>
    <p className='successMessage'>{message}</p>
  </div>

}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div>
    <p className='errorMessage'>{message}</p>
  </div>

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => {
      setPersons(data)
    })
  }, [])


  const clearFields = () => {
    setNewName("")
    setNewNumber("")
  }

  const ShowMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const ShowErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    console.log(newName)
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
            ShowMessage(`${newName} edited`)

          }
        ).catch(error => {
          ShowErrorMessage(`Error: ${newName} removed from server`)
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
      ShowMessage(`${newName} added`)
    }).catch(error => {
      ShowErrorMessage(`Error: ${newName} removed from server`)
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
      <SuccessMessage message={message} />
      <ErrorMessage message={errorMessage} />

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