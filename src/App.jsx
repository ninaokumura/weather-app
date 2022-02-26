import React, { useState, useEffect, useMemo } from 'react';
import SearchInput from './components/SearchInput';

import { BsSunrise, BsSunset } from 'react-icons/bs';
// import './App.css';

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

  const weatherStats = [
    {
      label: 'Temp',
      value: `${weatherResult.temp}°C`,
    },
    {
      label: 'Feels like',
      value: `${weatherResult.feelsLike}°C`,
    },
    {
      label: 'Min',
      value: `${weatherResult.tempMin}°C`,
    },
    {
      label: 'Max',
      value: `${weatherResult.tempMax}°C`,
    },
  ];

  const sunStats = [
    {
      label: <BsSunrise />,
      value: `${weatherResult.sunrise}`,
    },
    {
      label: <BsSunset />,
      value: `${weatherResult.sunset}`,
    },
  ];

  const currentDay = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return (
    <div className='min-h-screen flex flex-col items-center justify-center  antialiased bg-gray-200 p-8'>
      <div className='grid m-12'>
        <h1 className='text-purple-800 md:text-8xl font-bold text-center text-5xl'>
          Weather
        </h1>
      </div>

      <div className='text-xl p-4 rounded-[1.75rem] shadow-2xl  bg-white max-w-3xl w-full grid gap-8'>
        {/* Search input */}
        <div className='w-full'>
          <SearchInput
            handleChange={handleChange}
            search={search}
            handleClick={handleClick}
          />
        </div>
        <div className='grid m-w-full'>
          <div className='sm:flex sm:justify-between sm:items-center '>
            <div className='flex flex-col '>
              {/* City name and country */}
              <h2 className=' text-2xl font-bold'>
                {weatherResult.city}{' '}
                <span className='font-medium opacity-40'>-</span>{' '}
                {weatherResult.country}
              </h2>
              <div className='flex flex-col gap-4'>
                <span className='text-[12px] sm:text-sm font-medium text-gray-600 '>
                  {currentDay}
                </span>
                <h3 className='font-medium text-gray-600'>
                  {weatherResult.description}
                </h3>
              </div>
            </div>
            <div className='w-20 h-20 flex sm:h-24 sm:w-24 rounded-full bg-purple-500'>
              <img src={weatherResult.iconUrl} alt='weather' />
            </div>
          </div>
        </div>

        {/* Weather data info  */}
        <div className='sm:py-8 sm:m-auto'>
          <div className='grid place-items-center'>
            <div className='md:flex md:space-x-8 grid grid-cols-2 gap-6 md:text-center'>
              {weatherStats.map(stats => (
                <div key={stats.label}>
                  <span className='font-bold text-purple-800 text-center'>
                    {stats.label}
                  </span>
                  <h3>{stats.value}</h3>
                </div>
              ))}

              {sunStats.map(stats => (
                <div key={stats.label}>
                  <span className='text-[1.73rem] text-yellow-600 md:grid md:place-items-center'>
                    {stats.label}
                  </span>
                  <h3>{stats.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
