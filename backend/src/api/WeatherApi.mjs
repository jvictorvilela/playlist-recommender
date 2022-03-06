import axios from 'axios'
import 'dotenv/config'

class WeatherApi {

    apiBase = 'https://api.openweathermap.org/data/2.5/'

    async getCurrentWeatherByCoordinates(coordinates = {lat:0, lon:0}) {
        try {
            const res = await axios.get('weather', {
                baseURL: this.apiBase,
                params: {
                    appid: process.env.WEATHER_API_KEY,
                    lat: coordinates.lat,
                    lon: coordinates.lon,
                    units: 'metric'
                }
            })

            return res.data.main.temp
        } catch (err) {
            console.log(err.data)
            throw new Error('Erro se comunicar com a API do Open Weather')
        }
    }

    async getCurrentWeatherByCityName(cityName) {
        try {
            const res = await axios.get('weather', {
                baseURL: this.apiBase,
                params: {
                    appid: process.env.WEATHER_API_KEY,
                    q: cityName,
                    units: 'metric'
                }
            })

            return res.data.main.temp
        } catch (err) {
            throw new Error('Erro se comunicar com a API do Open Weather')
        }
    }
}

export default WeatherApi