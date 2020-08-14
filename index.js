const express = require('express')
const postRoutes = require('./posts/postRoutes')
const cors = require('cors')


const server = express()

server.use(express.json());
server.use(cors());
server.use(postRoutes);


server.listen(5000, ()=> console.log("Api running on port 5000"))