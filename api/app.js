// --------------------------------------------------
// Imports, Initialization and CORS configuration
// --------------------------------------------------

import express from 'express'
import cors from 'cors'

import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

import { connectToDatabase } from './database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --------------------------------------------------
// Initialization and CORS configuration
// --------------------------------------------------

const app = express()
const port = process.env.PORT || 8080

const corsOptions = {
    origin: ['http://127.0.0.1:5176', 'http://localhost:5176'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})

// --------------------------------------------------
// Routes
// --------------------------------------------------

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// --------------------------------------------------
// Server
// --------------------------------------------------

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
