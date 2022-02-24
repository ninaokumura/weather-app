import React, { useState, useEffect, useMemo } from 'react';

// import { BsSunrise, BsSunset } from 'react-icons/bs';
// import './App.css';

// const icons = {};

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

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-yellow-200 antialiased'>
      <div className='grid gap-8'>
        <h1 className='text-purple-800 text-8xl font-bold text-center'>
          Weather
        </h1>

        <div className='flex w-full justify-center'>
          <div className=' max-w-min flex overflow-hidden rounded-l-full rounded-r-full scale-125'>
            <input
              onChange={handleChange}
              className='border-none'
              type='search'
              name='search'
              value={search}
              placeholder='City. e.g. Auckland'
            />
            <button
              className='bg-purple-800 text-white text-xl h-full px-4'
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='display-data'>
        <div className='data-name-container'>
          <h2 className='data-title'>
            {city}
            <span> {weatherResult.country}</span>
          </h2>
        </div>
        <div className='data-info'>
          <h3>{weatherResult.description}</h3>
          <h3>{weatherResult.temp}</h3>
          <h3>{weatherResult.feelsLike}</h3>

          <h3>{weatherResult.tempMin}</h3>
          <h3>{weatherResult.tempMax}</h3>
          <h3>{weatherResult.sunrise}</h3>
          <h3>{weatherResult.sunset}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
