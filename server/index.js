import express from "express";
import { Server } from "socket.io";

import{createServer} from "http"; // handshake with http server

const app = express();

const port = 3000

const server = createServer(app);   
// http network provides a foundation for our Socket.io server

// We create a server on top of the http server handshake 
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"] , // methods allowed to connect to our server
        credentials: true,  // enable credentials
    }
});



// this is a socket function that establishes a live connection
io.on("connection", (socket) => {
   console.log("A user has been connected",socket.id)
   
   // emit to all connected sockets
//    socket.emit("welcome","welcome to the chat application");
//    socket.broadcast.emit("welcome",`${socket.id} has joined the chat`)

// Recive msg from user using socket.on()
socket.on("message",({room,message})=>{
    console.log({room,message})
    // ye recive data client pe or front end pe dikhane ke liye 
    // socket.broadcast.emit("recieved-message",data);

    // send msg to specific reciever.
    socket.to(room).emit("recieved-message",message)
})

socket.on("join-room",(roomName)=>{
    console.log(`user joined room ${roomName}`);
    socket.join(roomName);
})
// when we close tab it disconnected the user
socket.on("disconnect", () =>{
    console.log("A user has been disconnected",socket.id);
})
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})