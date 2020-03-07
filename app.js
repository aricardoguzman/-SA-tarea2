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
  res.write(`<h1>Descargar build!</h1>
    <a href="/.netlify/functions/app/version" download>Descargar archivo</a>`)
  res.end()
})

router.get('/version', (req, res) => {  
  fs.readFile(path.join(__dirname, '/dist/release.zip'), (err, data) => {
    if (err) {

    } else {
      res.setHeader('Content-Type', 'application/x-gzip')
      res.end(data)
    }
  })
})

router.get('/another', (req, res) => res.json({ route: req.originalUrl }))

app.use('/.netlify/functions/app', router) // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')))

module.exports = app
module.exports.handler = serverless(app)
