import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import './App.css';
import {WEATHER_API_URL} from "./api";
import {useState} from "react";
import Forecast from "./components/forecast/Forecast";

function App() {
  let [currentWeather, setCurrentWeather] = useState(null);
  let [forecast, setForecast] = useState(null);

  let handleOnSearchChange = (searchData) => {
    let [lat, lon] = searchData.value.split(" ");
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    let weatherApiUrl = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    let forecastApiUrl = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    let currentWeatherFetch = fetch(weatherApiUrl);
    let forecastFetch = fetch(forecastApiUrl);

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      let weatherResponse = await response[0].json();
      let forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
    }).catch((err) => console.log(err));
  };

  return (

      <div className="container">
        <Search onSearchChange={handleOnSearchChange}/>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forecast && <Forecast data={forecast}/>}
      </div>

  );
}

export default App;
