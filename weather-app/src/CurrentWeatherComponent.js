import "./CurrentWeatherComponent.css";
import React, { useContext, useEffect } from 'react';
import WeatherContext from './WeatherContext';

export function CurrentWeather() {
    const { geoData, setGeoData, weatherData, setWeatherData, cityName, setCityName } = useContext(WeatherContext);

    const fetchDataForCity = (city) => {
        const testUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&lang=pl&appid=723d2ea54043cdf57eb953f291379dc3`;

        fetch(testUrl)
            .then(response => response.json())
            .then(data => {
                setGeoData(data);
                if (data && data[0]) {
                    const { lat, lon } = data[0];
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pl&appid=723d2ea54043cdf57eb953f291379dc3`;
                    return fetch(url);
                }
                throw new Error("No data for the given city");
            })
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error("Error fetching data:", error));
    }

    const handleInputClick = (event) => {
        event.target.value = '';
    };

    useEffect(() => {
        fetchDataForCity(cityName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        setCityName(e.target.value);
    };

    const handleSearchClick = () => {
        fetchDataForCity(cityName);
    };

    if (!weatherData) return <div>Ładowanie...</div>;

    const { main, wind, clouds, sys, weather , dt} = weatherData;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    return (
        <WeatherContext.Provider value={{ weatherData, geoData, cityName }}>
            <div className="Current-weather-box">
                <div className="City-searcher">
                    <div className="City-searcher-input">
                        <input type="text" id="cityName" placeholder="Wprowadź nazwę miejscowości" onChange={handleInputChange} onClick={handleInputClick}></input>
                        <button className="Search-button" onClick={handleSearchClick}></button>
                    </div>
                </div>
                <div className="Current-weather-city-and-time">
                    <div className="Current-weather-city">
                        <span>{weatherData.name}</span>
                        <img src={iconUrl} alt="weather icon"></img>
                    </div>
                    <span>{new Date(dt*1000).toLocaleTimeString()}</span>
                </div>
                <div className="Current-weather-data">
                    <div className="Current-weather-data-main">
                        <span className="Data-title">Główne</span>
                        <div className="Current-weather-data-main-items">
                            <p>Temp. aktualna: {main.temp}&nbsp;°C</p>
                            <p>Temp. odczuwalna: {main.feels_like}&nbsp;°C</p>
                            <p>Ciśnienie atm.: {main.pressure}&nbsp;hPa</p>
                            <p>Wilgotność: {main.humidity}&nbsp;%</p>
                        </div>
                    </div>
                    <div className="Current-weather-data-wind">
                        <span className="Data-title">Wiatr</span>
                        <div className="Current-weather-data-wind-items">
                            <p>Prędkość wiatru: {wind.speed ? Math.round((wind.speed*3600)/1000)+" km/h": "N/A"}</p>
                            <p>Kierunek wiatru: {wind.deg}&nbsp;°</p>
                            <p>Porywy wiatru: {wind.gust ? Math.round((wind.gust*3600)/1000)+" km/h": "N/A"}</p>
                        </div>
                    </div>
                    <div className="Current-weather-data-extras">
                        <span className="Data-title">Dodatkowe</span>
                        <div className="Current-weather-data-wind-items">
                            <p>Zachmurzenie: {clouds.all}&nbsp;%</p>
                            <p>Państwo: {sys.country}</p>
                            <p>Wschód słońca: {new Date(sys.sunrise*1000).toLocaleTimeString()}</p>
                            <p>Zachód słońca: {new Date(sys.sunset*1000).toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </WeatherContext.Provider>
    );
}
