import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ action }) => {
  return (
    <form>
      <div>
        Find countries <input onChange={action} />
      </div>
    </form>
  )
}

const Flag = ({ country }) => <img src={country.flags.png} alt={country.name.common} />



const Languages = ({ country }) => {
  return (
    <ul>
      {Object.values(country.languages)
        .map(lang => <li>{lang}</li>)}
    </ul>
  )
}

const CountryList = ({ countries, filterText }) => {
  const filteredCountries = countries
    .filter(country => country.name.common.toLowerCase()
      .includes(filterText.toLowerCase()))

  if(filterText === ""){
    return <p>Enter a filter</p>
  }
  // only one country
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages:</h3>
      <Languages country={country} />
      <Flag country={country} />
    </div>
  }

  // less than ten countries
  if (filteredCountries.length < 10) {
    return (
      <div>
        {
          filteredCountries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
      </div>

    )
  }

  return <p>Too many matches</p>

}


function App() {

  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <Filter action={handleFilterChange} />

      <CountryList countries={countries} filterText={filterText} />

    </div>
  )
}

export default App;
