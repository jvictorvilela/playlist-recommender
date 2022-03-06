class Playlist {
    musics = []

    constructor(name, description, imageUrl, url, musics = []) {
        this.name = name
        this.description = description
        this.musics = musics
        this.url = url
        this.imageUrl = imageUrl
        this.musics = musics
    }

    static getPlaylistCategoryByTemperature(temp) {
        
        if (temp > 30) {
            return 'party'
        }

        if (temp <= 30 && temp >= 15) {
            return 'pop'
        }

        if (temp >= 10 && temp <= 14) {
            return 'rock'
        }

        if (temp < 14) {
            return 'classical'
        }

    }

}

export default Playlist