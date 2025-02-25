import express from 'express';
import { Server } from 'socket.io';

const app = express()
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to our chat application built by - Rohit</h1>")
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})