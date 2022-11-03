import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'

function App() {

  // key
  const api_key = process.env.REACT_APP_API_KEY

  // weather data
  const [weather, setWether] = useState([])

  // to let components know if weather data can be pulled
  const [loaded, setLoaded] = useState(false)

  const [countries, setNewCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  // list of countries filtered with search
  const [showCountry, setShowCountry] = useState([])

  // if button is clicked, show one country
  const [showOne, setShowOne] = useState(true)

  // filter returns all country names that match users search
  const filter = countries.filter(country => 
    country.name.official.toLowerCase().includes(newSearch))

  // changes state from true to false, if true -> countries shown are everything matching search. 
  // False -> show one specific country (linked to show button)
  const countriesToShow = showOne
    ? filter
    : showCountry

  // launch weather api
  const weatherHook = (url) => {
    console.log('effect weather')
    axios
      .get(url)
      .then(response => {
        console.log('weather promise fulfilled')
        setWether(response.data)
        setLoaded(true)
      })
    }
  
  // start weather API if conditions met
  useEffect(() => {
    if (filter.length === 1 || showOne === false){
      // dedice capital coordinates if button clicked to show country
      if (showOne === false){
        var coord = countriesToShow.capitalInfo.latlng
        var lat = coord[0]
        var lon = coord[1]
      }
      // if country chosen with filtering till 1 country
      else {
        coord = filter.map(item => item.capitalInfo.latlng)
        lat = coord[0][0]
        lon = coord[0][1]
      }

      console.log('loaded')

      // create url for weather api data
      const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+api_key
      console.log('launch')
      weatherHook(url)
      console.log(loaded)
      
      // conditions to only run the useEffect if these conditions change
      }},[filter.length !== 1 || showOne === true, filter.length === 1 || showOne === false])
    

  // json into an useState
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setNewCountries(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      {/* search field */}
      <Search
        text='find countries' 
        value={newSearch} 
        onChange={(event) => 
          setNewSearch(event.target.value)}
      />
      {/* Everything to be displayed to the user */}
      <Display filter={filter} showCountry={showCountry}
      setShowCountry={setShowCountry} showOne={showOne} 
      setShowOne={setShowOne} weather={weather} loaded={loaded} countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;