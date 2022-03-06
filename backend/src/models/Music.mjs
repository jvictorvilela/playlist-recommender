class Music {
    constructor(id, name, artistName, musicUrl) {
        this.id = id
        this.name = name
        this.artistName = artistName
        this.musicUrl = musicUrl
    }

    getName() {
        return this.name
    }

    getArtistName() {
        return this.artistName
    }

    getAlbumName() {
        return this.albumName
    }

    getMusicUrl() {
        return this.musicUrl
    }
}

export default Music