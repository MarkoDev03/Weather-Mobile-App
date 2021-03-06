export const getWeather = (lat = "43.316872", lon = "21.894501") => {
    return `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${lon}`
}

export const getPollen = (lat = "43.316872", lon = "21.894501") => {
    return `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lon}`
}

export const getAirQualityIndex = (lat = "43.316872", lon = "21.894501") => {
    return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=49cc8c821cd2aff9af04c9f98c36eb74`
}

export const getCity = (lat = "43.316872", lon = "21.894501") => {
    return `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&pretty=1&key=572d4a63d1b040e0b11092b3f924227c`
}