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

//fetch weather info from capital of selected country
const GetWeather = ({country}) =>{
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]

    console.log("lat lon",lat, lon)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [])

  return weather
}

const DisplayWeather = ({country}) => {
  const weather = GetWeather(country={country})
  console.log(weather)

  if(weather.length != 0){
    return(
      <div>
       <p>Temperature in {country.country.capital} is {weather.main.temp} °C</p>
       <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
       <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
  
}

const DisplayCountry = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area} km^2</p>
      <h3>Languages:</h3>
      <Languages country={country} />
      <Flag country={country} />
      <h2>Weather in {country.capital}</h2>
      <DisplayWeather country={country} />
    </div>
  )
}

const Languages = ({ country }) => {
  return (
    <ul>
      {Object.values(country.languages)
        .map(lang => <li>{lang}</li>)}
    </ul>
  )
}

const CountryListElement = ({ country, setFilterText }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => {setFilterText(country.name.common)}}>show</button>
    </div>
  )
}

const CountryList = ({ countries, filterText, setFilterText }) => {
  const filteredCountries = countries
    .filter(country => country.name.common.toLowerCase()
      .includes(filterText.toLowerCase()))

  if (filterText === "") {
    return <p>Enter a filter</p>
  }
  // only one country
  if (filteredCountries.length === 1) {
    return <DisplayCountry country={filteredCountries[0]} />
  }

  // less than ten countries
  if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map(country => <CountryListElement country={country} setFilterText={setFilterText}/>)}
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

      <CountryList countries={countries} filterText={filterText} setFilterText={setFilterText} />

    </div>
  )
}

export default App;
