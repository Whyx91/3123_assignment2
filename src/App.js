import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Ensure this file exists and contains your styles

const API_KEY = "cd533008b9f53f872c6c7b99d7f893ca"; // Your actual OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city.trim()) return alert("Please enter a city!");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const { name, weather, main, wind } = response.data; // Destructure response
      setWeather({ name, weather: weather[0], main, wind });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found! Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
        <p>Student Name: Abdulgafar Towolawi</p>
        <p>Student ID: 101462578</p>
      </header>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather.description}</p>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <div className="details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
