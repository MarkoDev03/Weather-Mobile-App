export const getWeather = (lat, lon) => {
    return `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${lon}`
}

export const getPollen = (lat, lon) => {
    return `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lon}`
}

export const getAirQualityIndex = (lat, lon, API_KEY) => {
    return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
}

export const getCityName = (lat, lon) => {
    return `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&pretty=1&key=572d4a63d1b040e0b11092b3f924227c`
}