'use strict'
const express = require('express')
const serverless = require('serverless-http')
const app = express()
const path = require('path')
const fs = require('fs')

app.use('/static', express.static(path.join(__dirname, '/public')))

const router = express.Router()
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(`
    <style>
      .button {
        display: block;
        width: 115px;
        height: 25px;
        background: #4E9CAF;
        padding: 10px;
        text-align: center;
        border-radius: 5px;
        color: white;
        font-weight: bold;
      }
    </style>
    <h1>Descargar build!</h1>
    <a class="button" href="/.netlify/functions/app/version" download>Descargar archivo</a>`)
  res.end()
})

router.get('/version.zip', (req, res) => {
  const readStream = fs.createReadStream('./dist/release.zip')

  // When everything has been read from the stream, end the response
  readStream.on('close', () => res.end())

  // Pipe the contents of the readStream directly to the response
  readStream.pipe(res)
})

router.get('/another', (req, res) => res.json({ route: req.originalUrl }))

app.use('/.netlify/functions/app', router) // path must route to lambda
app.use('/', (req, res) => res.sendFile('./dist/index.html'))

module.exports = app
module.exports.handler = serverless(app)
