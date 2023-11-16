import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faMagnifyingGlass, faWater, faWind } from '@fortawesome/free-solid-svg-icons'; 

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const API_KEY = "dd8d0a0c2d7631a5476998b5d9496ae4";

  const search = async (e) => {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`
      ).then((res) => res.json());
      setWeather(data);
      // console.log(weather, data);
      setQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  const containerStyle = (weather.main || weather.cod) ? {height:"auto", minHeight:"500px" } : {};

  const weatherIcon = {
    clear: "./images/clear.png",
    cloud: "./images/cloud.png",
    rain: "./images/rain.png",
    snow: "./images/snow.png",
    mist: "./images/mist.png",
  }

  return (
    <div className="weather-container" style={containerStyle}>
      <div className="search-box">
        <div className="map-icon"><FontAwesomeIcon icon={faMapMarkerAlt}/></div>       
        <input
          className="input-box"
          type="text"
          placeholder="Enter Your Location"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          value={query}
        />
        <button onClick={search}>
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </button>
      </div>

      <div className="not-found">
        {weather.cod === "404" && (
          <div>
            <img src="./images/404.png" alt="not-found" width="400px" ></img>
            <p>Oops! We can't find your location.</p>
          </div>
        )}
      </div>

      <div className="weather-box">
        {weather.main && (
          <div>
            <h4>{weather.name}, {weather.sys.country}</h4>
            <img src={weatherIcon[weather.weather[0].main.toLowerCase()] || "./images/default.png"} alt="weather-icon" width="150px"></img>
            <h2 className="temperature">{Math.round(ConvertFtoC(weather.main.temp))}°C</h2>
            <p className="description">{weather.weather[0].description}</p>
          </div>
        )}
      </div>

      <div className="weather-details">
        {weather.main && weather.wind && (
          <>
          <div className="humidity">
            <FontAwesomeIcon icon={faWater}/>
            <div>
              <span>{weather.main.humidity}%</span>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind">
            <FontAwesomeIcon icon={faWind}/>
            <div>
              <span>{weather.wind.speed}Km/h</span>
              <p>Wind Speed</p>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

function ConvertFtoC(temp_f){
  const temp_c = (temp_f - 32) * 5/9;
  return temp_c;
}


export default Weather;
