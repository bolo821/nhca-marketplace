import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import routes from './routes'
import mongoose from "./config/mongoose"
import useragent from 'express-useragent'
import dir from "../dir"

const port = 2003
const app = express()
const http = require('http').createServer(app)
mongoose()

app.use(useragent.express());
app.use(compression())
app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.static(dir.dir + '/upload'))
app.use(express.static(dir.dir + '/cryptobuild'))
app.use('/assets', routes)

http.listen(port, () => {
    console.log('server listening on:', port)
})
