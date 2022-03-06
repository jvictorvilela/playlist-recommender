import PlaylistsRepository from '../repositories/PlaylistsRepository.mjs'

class PlaylistController {
    static async list(req, res) {
        try {
            if (req.query.lat && req.query.lon) {
                const playlistRepository = new PlaylistsRepository()
                res.json(await playlistRepository.getRandomPlaylistByCoordinates({
                    lat: req.query.lat,
                    lon: req.query.lon
                }))
            } else if (req.query.city) {
                const playlistRepository = new PlaylistsRepository()
                res.json(await playlistRepository.getRandomPlaylistByCityName(req.query.city))
            } else {
                res.status(400).json({message: 'Parâmetros inválidos'})
            }
        } catch (err) {
            res.status(500).json({message: 'Erro!'})
        }
    }
}

export default PlaylistController