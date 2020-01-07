const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRoutes = require('./routes/blogRoutes')

const mongoUrl = config.MONGODB_URI
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
   console.log('Connected to ' + mongoUrl)
  })
  .catch((error) => console.error(error))

app.use(cors())
app.use(bodyParser.json())
app.use(blogRoutes)

module.exports = app