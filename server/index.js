import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';

const app = express()
const PORT = 3000;
const server = createServer(app)
//http network provides foundation for our Socket.io server

//we create a server on top of the http server handshake
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(cors())

app.get("/", (req, res) => {
    res.send("<h1>Welcome to our chat application built by - Rohit</h1>")
})

//this is a socket function that establishes a live connection
io.on('connection', (socket) => {
    console.log('a new client has connected with id : ', socket.id)


    socket.on("message", (data)=> {
        console.log(data);
        io.emit("message", data);
    })
    // socket.emit("welcome", "Welcome to our chat application")

    // socket.broadcast.emit("welcome", `${socket.id} has joined the chat`)

    socket.on("disconnect", ()=> {
        console.log("a client has disconnected", socket.id)
    })
})


//we make the http server on which the sockets are connect listen on port 3000
server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})