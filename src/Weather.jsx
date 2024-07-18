import React, { useState } from 'react';
import './Weather.css';

const api = {
  key: "552e59d827ed924b9fbd6c1996495714",
  base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  let weatherClass = 'weather';
  if (typeof weather.main != "undefined") {
    weatherClass = weather.main.temp > 16 ? 'weather warm' : 'weather cold';
  }

  return (
    <div className={weatherClass}>
      <main>
      <p className="initial-message">Enter location to check weather.</p>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {!weather.main && (
          <div className="blogs">
            <h2>Weather-Related Blogs</h2>
            <ul>
              <li><a href="https://tme.net/blog/types-of-weather-patterns-phenomena/">
              <img src={process.env.PUBLIC_URL + '/patttern1.jpg'}  alt="Weather Patterns" />
              Understanding Weather Patterns</a></li>
              <li><a href="https://www.accuweather.com/en/in/new-delhi/187745/weather-forecast/187745">
              <img src={process.env.PUBLIC_URL + '/read.jpg'}  alt="Weather Patterns" />

                How to Read a Weather Forecast</a></li>
              <li><a href="https://science.nasa.gov/climate-change/what-is-climate-change/">
              <img src={process.env.PUBLIC_URL + '/change.jpeg'}  alt="Weather Patterns" />
              The Impact of Climate Change</a></li>
            </ul>
          </div>
        )}

        {weather.main && (
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys?.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            <div className="weather-description">{weather.weather[0]?.description}</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Weather;
