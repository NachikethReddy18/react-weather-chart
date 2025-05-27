import React, { useState, useEffect } from "react";
import { getCurrentWeather, getHistoricalWeather } from "./services/weatherService";
import WeatherChart from "./components/WeatherChart";

function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;

      try {
        const current = await getCurrentWeather(city);
        setCurrentWeather(current);

        const historical = await getHistoricalWeather(current.coord.lat, current.coord.lon);
        setHistoricalData(historical);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather App</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      {currentWeather && (
        <div>
          <h2>Current Weather in {currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp} °C</p>
        </div>
      )}
      {historicalData.length > 0 && (
        <>
          <h2>Historical Temperature</h2>
          <WeatherChart weatherData={historicalData} />
        </>
      )}
    </div>
  );
}

export default App;
