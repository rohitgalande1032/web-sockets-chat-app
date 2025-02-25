import { Container, TextField, Typography, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client'
//this would be responsible for connection client with the server

function App() {
  const socket = useMemo(()=> io('http://localhost:3000'), [])

  const [message, setMessage] = useState("")
  const [room, setRoom] = useState("")
  const [socketId, setSocketId] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, room})
    setMessage("")
  }

  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id)
      console.log('connected to the server', socket.id);
    })

    socket.on("receive-message", (data) => {
      console.log(data)
    })

    socket.on("welcome", (msg) => {
      console.log(msg)
    })

    return ()=> {
      socket.disconnect()
    }

  }, [])

  return (
    
    <>
      <Container>
        <Typography variant='h5' component="div" gutterBottom>
          Welcome to the chat application built by - Rohit
        </Typography>
        <Typography variant='h5' component="div" gutterBottom>
          {socketId}
        </Typography>
      </Container>

      <form onSubmit={handleSubmit}>
        <TextField type='text' value={message} onChange={(e)=> setMessage(e.target.value)} label="Message" variant='outlined'/>
        <TextField type='text' value={room} onChange={(e)=> setRoom(e.target.value)} label="Room" variant='outlined'/>
        <Button type='submit' variant="contained" color="primary">Send</Button>
      </form>
    </>

    
  )
}

export default App
