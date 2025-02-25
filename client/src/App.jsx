import { Container, TextField, Typography, Button, Stack, Paper, Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const socket = useMemo(() => io('http://localhost:3000'), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [RoomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomName = (e) => {
    e.preventDefault();
    socket.emit("join-room", RoomName);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected to the server", socket.id);
    });

    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to the Chat App
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Your ID: {socketId}
        </Typography>

        {/* Join Room Form */}
        <Box component="form" onSubmit={joinRoomName} sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <TextField fullWidth label="Room Name" value={RoomName} onChange={(e) => setRoomName(e.target.value)} variant="outlined" size="small" />
          <Button type="submit" variant="contained" color="primary">Join</Button>
        </Box>

        {/* Send Message Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <TextField fullWidth label="Message" value={message} onChange={(e) => setMessage(e.target.value)} variant="outlined" size="small" />
          <TextField fullWidth label="Room" value={room} onChange={(e) => setRoom(e.target.value)} variant="outlined" size="small" />
          <Button type="submit" variant="contained" color="secondary">Send</Button>
        </Box>

        {/* Messages Display */}
        <Stack spacing={1} sx={{ maxHeight: 300, overflowY: 'auto', p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
          {messages.map((msg, index) => (
            <Paper key={index} elevation={1} sx={{ p: 1.5, borderRadius: 2, textAlign: "left" }}>
              <Typography variant="body1">{msg}</Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
