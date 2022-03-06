import express from 'express'
import PlaylistController from '../controllers/PlaylistController.mjs'

const router = express.Router()

router.get('/', PlaylistController.list)

export default router