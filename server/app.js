// Importing libraries
const express = require('express');
const {Server} = require('socket.io');
const http = require("http");
const { Socket } = require('dgram');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const commentRouter = require('./routes/router')

const app = express()
const server =  http.createServer(app)
// creating io server
const io = new Server(server);


// middleware
app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    req.io = io; // Attach the io instance
    next();      // Ensure the next middleware or route executes
});

// Handle socket connection
io.on('connection',(socket) =>{
    console.log("A user connected",client.id);

    socket.on("new comment",(comment)=>{
        io.emit("chat message",comment); //Broadcast message to all client

    })

    socket.on("disconnect",()=>{
        console.log("User disconnected");
    })
})

// using routes
app.use('/api',commentRouter);

const PORT = process.env.PORT || 8800;
// server listning to the port
server.listen(process.env.PORT,()=>{
    console.log('Server running on port 5000....');
})