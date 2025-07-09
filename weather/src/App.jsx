import { useState, useEffect } from 'react'
import './App.css'
import PropTypes from "prop-types"

import searchIcon from './assets/search.png';
import cloudIcon from './assets/cloud.jpg';
import clearIcon from './assets/clear.jpg';
import windIcon from './assets/wind.png';
import rainIcon from './assets/rain.jpg';
import snowIcon from './assets/snow.jpg';
import drizzleIcon from './assets/drizzle.jpg';
import humidityIcon from './assets/fog.png';


const WeatherDetails =({icon, temp, city, country, lat, log, humidity, wind}) => {
  return(
    <>
    <div className="image">
      <img src={icon} alt="Image" className='clear'/>
    </div>
    <div className="temp">{temp} ℃</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="log">longitude</span>
        <span>{log}</span>
    </div>
          </div>
          <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humi" className='icon'/>
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
          <div className="element">
          <img src={windIcon} alt="wind" className='icon'/>
          <div className="data">
            <div className="wind-percentage">{wind} km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
          </div>
        
    </>
  )
}
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  country: PropTypes.string .isRequired
}

function App() {
  const [text,setText] = useState('madurai')

 const [icon, setIcon] = useState(snowIcon)
 const [temp, setTemp] = useState(10)
 const [city, setCity] = useState('chennai')
 const [country, setCountry] = useState("IN")
 const [lat, setLat] = useState(0)
 const [log, setLog] = useState(0)
 const [humidity, setHumidity] = useState(0)
 const [wind, setWind] = useState(0)
 const [cityNotFound, setCityNotFound] = useState(false)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)

 const weatherIconMap = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": clearIcon,
  "02n": clearIcon,
  "03d": drizzleIcon,
  "03n": drizzleIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
 }

 const search=async () => {
  setLoading(true);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=dcb9eeacfb6215038171dd1d65f5fb1f&units=metric`

  try {
    let res = await fetch(url)
    let data = await res.json()
    if(data.cod === "404") {
      console.error("city not found");
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country)
    setLat(data.coord.lat);
    setLog(data.coord.lon);
const weatherIconCode = data.weather[0].icon;
const matchedIcon = weatherIconMap[weatherIconCode] || clearIcon;
setIcon(matchedIcon);
setCityNotFound(false)
  } catch (error) {
    console.error("An error occured:", error.message);
    setError('An error occured while fetching weather data')
  } finally {
    setLoading(false)
  }
}
const handleCity=(e) => {
  setText(e.target.value)
}
const handleKeyDown=(e) => {
  if(e.key === "Enter") {
    search()
  }
} 
useEffect(function() {
  search()
},[])
  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input type="text"  className='city-input' placeholder='search City' onChange={handleCity} value={text}
          onKeyDown={handleKeyDown}/>
        <div className="search-icon">
          <img src={searchIcon} alt="search" onClick={() =>search()}/>
        </div>
         </div>
         {loading && <div className="loading-message">Loading...</div>}
         {error &&<div className="error-message">{error}</div>}
         {cityNotFound && <div className="city-not-found">City Not Found</div>}


         {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}


         <p>
          Designed by <span>subu</span>
         </p>
      </div>
    </>
  )
}

export default App
