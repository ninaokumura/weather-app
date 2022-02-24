import React, { useState, useEffect, useMemo } from 'react';
import SearchInput from './components/SearchInput';

import { BsSunrise, BsSunset } from 'react-icons/bs';
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
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
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
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          tempMin: Math.round(data.main.temp_min),
          tempMax: Math.round(data.main.temp_max),
          country: data.sys.country,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(
            'en-US',
            {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }
          ),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
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

  const currentDay = new Date().toString();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center  antialiased bg-gray-200'>
      <div className='grid gap-8 m-12'>
        <h1 className='text-purple-800 text-8xl font-bold text-center'>
          Weather
        </h1>
      </div>

      <div className='text-xl p-6 rounded-[1.75rem] shadow-2xl  bg-white max-w-3xl w-full grid gap-8'>
        {/* Search input */}
        <SearchInput
          handleChange={handleChange}
          search={search}
          handleClick={handleClick}
        />
        <div className='grid m-auto w-full'>
          <div className='flex justify-between items-center'>
            <div>
              {/* City name and country */}
              <h2 className=' text-2xl font-bold'>
                {weatherResult.city}{' '}
                <span className='font-medium opacity-40'>-</span>{' '}
                {weatherResult.country}
              </h2>
              <span className='text-sm font-medium text-gray-600 '>
                {currentDay}
              </span>
              <h3 className='font-medium text-gray-600'>
                {weatherResult.description}
              </h3>
            </div>
            <div className='h-24 w-24 rounded-full bg-purple-500'>
              <img src={weatherResult.iconUrl} alt='weather' />
            </div>
          </div>
        </div>

        {/* Weather data info  */}
        <div className='m-auto'>
          <div className='flex space-x-14 text-center'>
            <h3>
              <span className='flex font-bold text-purple-800'>Temp</span>
              {weatherResult.temp}&deg;C
            </h3>
            <h3>
              <span className='flex font-bold text-purple-800'>Feels like</span>
              {weatherResult.feelsLike}&deg;C
            </h3>
            <h3>
              <span className='flex font-bold text-purple-800'>Min</span>{' '}
              {weatherResult.tempMin}&deg;C
            </h3>
            <h3>
              <span className='flex font-bold text-purple-800'>Max</span>{' '}
              {weatherResult.tempMax}&deg;C
            </h3>
            <h3>
              <span className='text-[1.73rem] text-yellow-600 grid place-items-center'>
                <BsSunrise />
              </span>{' '}
              {weatherResult.sunrise}
            </h3>
            <h3>
              <span className='text-[1.73rem] text-yellow-600 grid place-items-center'>
                <BsSunset />
              </span>{' '}
              {weatherResult.sunset}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Todo
// 1- convert temp to celsius
