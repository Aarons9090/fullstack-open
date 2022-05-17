const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config")
const blogsRouter = require('./controllers/blogs')




console.log(config.MONGOURL)
mongoose.connect(config.MONGOURL)

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(express.json())



app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})