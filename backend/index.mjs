import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import PlaylistRoutes from './src/routes/PlaylistRoutes.mjs'

const app = express()

// app.get('/', (req, res) => {
//     res.json('teste')
// })

if (process.env.APP_ENV == 'development') {
    app.use(cors())    
}

app.use(express.json())
app.use('/playlist', PlaylistRoutes)


app.listen(process.env.APP_PORT)


