const API_URL = '//api.openweathermap.org/data/2.5/weather';

export function getWeatherByCity(cityName) {
  const weatherUrl = `${API_URL}?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  return fetch(weatherUrl).catch(err => {
    console.log('Failed to get weather by city name:', err);
  });
}

export function getWeatherByGeoLocation(lat, lon) {
  const weatherUrl = `${API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  return fetch(weatherUrl).catch(err => {
    console.log('Failed to get weather by location.', err);
  });
}
