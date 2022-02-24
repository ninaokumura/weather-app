import React, { useState, useEffect, useMemo } from 'react';
import SearchInput from './components/SearchInput';

// import { BsSunrise, BsSunset } from 'react-icons/bs';
// import './App.css';

// const icons = {};

function getIconUrl(iconId) {
  return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
}

function App() {
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [weatherResult, setWeatherResult] = useState({});

  const weatherUrl = useMemo(
    () =>
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`,
    [city]
  );

  useEffect(() => {
    fetch(weatherUrl)
      .then(response => response.json())
      .then(data =>
        setWeatherResult({
          description: data.weather[0].description,
          iconUrl: getIconUrl(data.weather[0].icon),
          city: data.name,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          country: data.sys.country,
          sunrise: new Date(data.sys.sunrise).toLocaleTimeString(),
          sunset: new Date(data.sys.sunset).toLocaleTimeString(),
        })
      );
  }, [weatherUrl]);

  function handleChange(event) {
    event.preventDefault();
    // console.log(event.target.svalue);
    setSearch(event.target.value);
  }

  function handleClick() {
    setCity(search);
    setSearch('');
  }

  // const weatsherStats = [];

  return (
    <div className='min-h-screen flex flex-col items-center justify-center  antialiased bg-gray-200'>
      <div className='grid gap-8 m-12'>
        <h1 className='text-purple-800 text-8xl font-bold text-center'>
          Weather
        </h1>
      </div>
      {/* City Title and weather description */}
      <div className='text-xl p-8 rounded-3xl shadow-2xl bg-white max-w-3xl w-full grid gap-8'>
        <SearchInput
          handleChange={handleChange}
          search={search}
          handleClick={handleClick}
        />
        <div className='grid m-auto text-2xl font-bold w-full'>
          <h2>
            {weatherResult.city} {weatherResult.country}
          </h2>
          <div className='flex justify-between items-center'>
            <h3>{weatherResult.description}</h3>
            <div>
              <img src={weatherResult.iconUrl} alt='weather' />
            </div>
          </div>
        </div>
        {/* Weather data info  */}
        <div className='p-16'>
          <div className='grid grid-cols-2 gap-12 place-items-center'>
            <h3>Temp: {weatherResult.temp}</h3>
            <h3>Feels like: {weatherResult.feelsLike}</h3>

            <h3>Min: {weatherResult.tempMin}</h3>
            <h3>Max: {weatherResult.tempMax}</h3>
            <h3>Sunrise: {weatherResult.sunrise}</h3>
            <h3>Sunset: {weatherResult.sunset}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
