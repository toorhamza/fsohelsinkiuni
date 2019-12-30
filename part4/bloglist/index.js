const app = require('./app')
const express = require('express')
const server = express()
/* const http = require('http')

const server = http.createServer(app) */

server.use(app)


const PORT = 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})