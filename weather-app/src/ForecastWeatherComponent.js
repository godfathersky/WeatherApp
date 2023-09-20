import "./ForecastWeatherComponent.css";
import React, { useContext, useState, useEffect } from 'react';
import WeatherContext from './WeatherContext';

export function ForecastWeather(){
    const { geoData } = useContext(WeatherContext);
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        if (geoData && geoData[0]) {
        const { lat, lon } = geoData[0];
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=723d2ea54043cdf57eb953f291379dc3`;

        fetch(url)
            .then(response => response.json())
            .then(data => setForecastData(data))
            .catch(error => console.error("Error fetching forecast data:", error));
        }
    }, [geoData]);

    if (!forecastData) return <div>Loading forecast...</div>;

    return(
        <div className="Forecast-weather-box">
            <div className="Forecast-weather-data">
                <div className="Forecast-weather-title">
                    <h2>Prognoza 24-godzinowa</h2>
                </div>
                <div className="Forecast-weather-items">
                    <ul>
                        {forecastData.list.slice(0,8).map((forecast, index) => (
                            <li key={index}>
                                <h3>{new Date(forecast.dt * 1000).toLocaleString()}</h3>
                                <p>Temperature: {forecast.main.temp}°C</p>
                                <p>Feels Like: {forecast.main.feels_like}°C</p>
                                <p>Humidity: {forecast.main.humidity}%</p>
                                <p>Wind Speed: {forecast.wind.speed} m/s</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}