import './App.css';
import React, { useState } from 'react';
import WeatherContext from './WeatherContext';
import { CurrentWeather } from './CurrentWeatherComponent';
import { ForecastWeather } from './ForecastWeatherComponent';

function App() {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('Warszawa');


  return (
    <WeatherContext.Provider value={{ geoData, setGeoData, weatherData, setWeatherData, cityName, setCityName }}>
      <div className="App">
        {/* <header className="App-header">
          <p>Weather App</p>
        </header> */}
        <main className="App-main">
          <CurrentWeather></CurrentWeather>
          <ForecastWeather></ForecastWeather>
        </main>
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
