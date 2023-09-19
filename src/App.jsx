import { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import './null_styles.css';

import Forecast from './forecast';
import SmallForeCast from './smallForecast';
import './App.css';

const apiKey = "6e93c97dd5d14ccf872110732232508";

function App() {
  const [city, setCity] = useState(localStorage.getItem("weather_in_city") || "dzerjinsk");
  const [data, setdata] = useState(null);
  const [currentDate, setCurrentDate] = useState(0);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      const r = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
      );
      const response = await r.json();

      if (response.error) {
        setError(response.error.message);
        return null;
      }
      localStorage.setItem("weather_in_city", city);
      return response;
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getData().then(data => {
      setdata(data);
    });
  }, [city]) //eslint-disable-line

  function setCityfunc(e) {
    e.preventDefault();
    const item = document.querySelector("#inp");
    const text = item.value;
    setCity(text);
    setCurrentDate(0);
    item.value = "";
    item.blur();
  }

  return (
    <>
      {error ? <p>An error occurred: {error}</p> : (
        <div id="wr">
          <form onSubmit={setCityfunc}>
            <TextField
              id="inp"
              label="Enter your city"
              type="search"
              variant="standard"
            />
          </form>

          {data &&
            data.forecast.forecastday.map((forecastday, index) => (
              currentDate === index ? (
                <Forecast
                  key={index}
                  currentDate={currentDate}
                  nowIs={data.current.temp_c}
                  place={data.location.name}
                  country={data.location.country}
                  enteredData={forecastday}
                />
              ) : (
                <SmallForeCast
                  key={index}
                  num={index}
                  setCurrentDate={setCurrentDate}
                  futureDate={forecastday.date}
                />
              )
            ))
          }
        </div>)}
    </>
  );
}

export default App
