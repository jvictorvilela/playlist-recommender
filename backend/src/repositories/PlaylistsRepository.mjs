import SpotifyApi from '../api/SpotifyApi.mjs'
import WeatherApi from '../api/WeatherApi.mjs'
import Playlist from '../models/Playlist.mjs'
import Music from '../models/Music.mjs'

class PlaylistsRepository {
    
    allowedCategories = [
        'party',
        'pop',
        'rock',
        'classical'
    ]

    constructor() {
        this.spotifyApi = new SpotifyApi()
        this.weatherApi = new WeatherApi()
    }

    async getRandomPlaylistByCategory(category) {
        if (!this.allowedCategories.includes(category)) {
            throw new Error('Categoria inválida')
        }

        const response = await this.spotifyApi.getPlaylistsByCategory(category, 30)
        const randomIndex = (Math.random()*response.items.length) | 0

        return this.createPlaylist(response.items[randomIndex])

    }

    async getRandomPlaylistByCityName(cityName) {
        const currentTemp = await this.weatherApi.getCurrentWeatherByCityName(cityName)
        const categoryName = Playlist.getPlaylistCategoryByTemperature(currentTemp)
        return this.getRandomPlaylistByCategory(categoryName)
    }

    async getRandomPlaylistByCoordinates(coordinatesObj) {
        const currentTemp = await this.weatherApi.getCurrentWeatherByCoordinates(coordinatesObj)
        const categoryName = Playlist.getPlaylistCategoryByTemperature(currentTemp)
        return this.getRandomPlaylistByCategory(categoryName)
    }

    async createPlaylist(playlistResponseObj) {
        const musicsResponse = await this.spotifyApi.getMusicsByPlaylistId(playlistResponseObj.id)

        return new Playlist(
            playlistResponseObj.name,
            playlistResponseObj.description,
            playlistResponseObj.images[0].url,
            playlistResponseObj.external_urls.spotify,
            this.createMusics(musicsResponse)
        )
    }

    createMusics(musicsResponse) {
        let musics = []
        const items = musicsResponse.items

        items.forEach(music => {
            let obj = new Music(
                music.track.id,
                music.track.name,
                music.track.artists[0].name,
                music.track.external_urls.spotify
            )

            musics.push(obj)
        });

        return musics
    }
}

export default PlaylistsRepository