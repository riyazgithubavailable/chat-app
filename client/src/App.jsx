import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client";
// this would be responsible for connection client with the server
const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [roomName, setRoomName] = useState('');
  const [soketId, setSocketId] = useState("");
  const socket = useMemo(() => io('http://localhost:3000'), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected to server", socket.id);
    });

    // listen to the server's message event or yaha receive hua msg
    socket.on("recieved-message", (data) => {
      console.log(data);
       setMessages((prev)=>[...prev,data]);
    })
    // whenever server sends a welcome message, log it
    // socket.on("welcome",(msg)=>{
    //   console.log(msg);
    // })
    return () => {
      socket.disconnect();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // send the message to the server using socket.emit()
    socket.emit("message", {message,room});
    setMessage('');
  }
function joiningRoom(e){
  e.preventDefault();
  // send the message to the server using socket.emit()
  // "join-room" is a pre-name event
  socket.emit("join-room", roomName);
  setRoomName('');
}
  return (
    <Container>
      <Typography variant='h5' component='div'
        gutterBottom
      >Welcome to the chat application built by -Riyaz
      </Typography>

      <Typography variant='h5' component='div'
        gutterBottom
      >
        {soketId}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField type='text' placeholder='Type your message here'
          value={message} onChange={(e) => setMessage(e.target.value)}
          label='Message' variant='outlined'
        />
        <TextField type='text' placeholder='Type your message here'
          value={room} onChange={(e) => setRoom(e.target.value)}
          label='Room' variant='outlined'
        />
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>
      <form onSubmit={joiningRoom}>
      <TextField type='text' placeholder='Type your message here'
          value={roomName} onChange={(e) => setRoomName(e.target.value)}
          label='Room Name' variant='outlined'
        />
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>
      <Stack>
        {
          messages.map((msg, index) => (
            <Typography key={index} variant='h6'
              component='div'
              gutterBottom
            >
              {msg}
            </Typography>
          ))
        }
      </Stack>
    </Container>
  )
}

export default App
