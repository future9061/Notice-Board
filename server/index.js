const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const mongoose = require('mongoose')

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')))

app.use('/api', require("./Router/post.js"));
app.use('/api', require("./Router/get.js"));
app.use('/api', require("./Router/delete.js"));
app.use('/api', require("./Router/put.js"));

app.listen(port, () => {
  console.log(`서버 시작 ${port}`)
})

mongoose.connect(process.env.MONGDB_URI).then(() => console.log('몽고DB 연결성공')).catch(() => console.log('failed'))

app.get('/', (req, res) => {
  res.send(path.join(__dirname, `../client/build/index.html`))
})




