const express = require("express");
const postsRouter = require("./data/posts/posts-router");
const welcomeRouter = require("./data/host/welcome")
const cors = require('cors')

const server = express();
const port = 4000;

server.use(express.json());
server.use(cors())
server.use(welcomeRouter);
server.use(postsRouter);
 
 

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/api/posts`)
})
