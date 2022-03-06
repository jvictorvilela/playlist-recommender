import 'dotenv/config'
import axios from 'axios'

class SpotifyApi {

    accessToken = null
    apiBase = 'https://api.spotify.com/v1/'

    async getApiToken() {
        if (this.accessToken != null) {
            return this.accessToken
        }
        
        await this.generateAccessToken()

        return this.accessToken
    }

    async getPlaylistsByCategory(category, limit = 20) {
        const token = await this.getApiToken()

        try {
            const res = await axios.get(`browse/categories/${category}/playlists`, {
                params: {
                    'limit': limit
                },
                baseURL: this.apiBase,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return res.data.playlists
            
        } catch (err) {
            throw new Error('Erro se comunicar com a API do Spotify')
        }
    }

    async getMusicsByPlaylistId(id) {
        const token = await this.getApiToken()

        try {
            const res = await axios.get(`playlists/${id}/tracks`, {
                baseURL: this.apiBase,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return res.data
            
        } catch (err) {
            throw new Error('Erro se comunicar com a API do Spotify')
        }
    }

    async generateAccessToken() {
        try {
            const res = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
                },
            })
    
            this.accessToken = res.data.access_token
        } catch (err) {
            throw new Error('Erro ao gerar token da API do Spotify')
        }
    }
}

export default SpotifyApi