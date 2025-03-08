import { Server } from "socket.io";
import http from "http";
import express from "express"
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://oneseen.onrender.com","http://localhost:5173"],
        methods: ["GET", "POST","DELETE","PUT","PATCH"],
    }
});
/**
 * Returns the socketId of a user given his userId
 * @param {string} recieverId - The userId of the user whose socketId is to be retrieved
 * @returns {string} The socketId of the user
 */
export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}
const userSocketMap = {};//{userId:socketId}
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    const userId = socket.handshake.query.userId;
    const Authuser = socket.handshake.query.Authuser;
    console.log('userId:', userId);
    console.log('Authuser:', Authuser);
    if (userId!==null ) {
        userSocketMap[socket.id] = userId;
    }
    if (Authuser!==undefined) {
        userSocketMap[socket.id] =Authuser.id;
    }
    console.log('userSocketMap:', userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on('sendMesage', async(data) => {
        const res = await fetch(`http://localhost:5000/api/messages/create-message/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({message:data.message,expiresAt:data.expiresAt,sender:data.sender,recipient:data.recipient}),
        });
        const response=await res.json();
        console.log('response:',response);
            // console.log('data recieved',data);
        const receiverSocket = Object.keys(userSocketMap).find(
               (key) => userSocketMap[key] === data.recipient
             );
             const senderSocket=Object.keys(userSocketMap).find(
               (key) => userSocketMap[key] === data.sender
             )
             console.log('receiverSocket:', receiverSocket);
    //    io.emit('receiveMessage',response);       
       if (receiverSocket) {
        console.log('receiverSocket:', receiverSocket);
               io.to(receiverSocket).emit('receiveMessage', response);
               io.to(senderSocket).emit('receiveMessage', response);
       }
    });
    socket.on("upvoted",(data)=>{
        io.emit("upvoted",data);
    })
    socket.on("downvote",(data)=>{
        io.emit("downvote",data);
    })
    socket.on("newPost",(data)=>{
        io.emit("newPost",data);
    })
    socket.on('newComment',(data)=>{
        io.emit('newComment',data);
    });
    socket.on('postDeleted',(data)=>{
       io.emit('postDeleted',data); 
    });
    socket.on('EditImage',(data)=>{
        io.emit('EditImage',data);
    })
    socket.on('disappearMessage', async (msg) => {
        try {
        //  console.log('id d:', id);
         console.log('msg d:', msg);
               const res = await fetch(`http://localhost:5000/api/messages/delete-message/${msg._id}`, {
                method: 'DELETE',
            });
        
            if (res.status === 200) {
                io.emit('disappearMessage', msg);
            }
        // }
        } catch (error) {
            console.error('Error disappearing message:', error);
        }
    });
    
    socket.on('register', (userId) => {
        console.log('registered user with ID:', userId);
        for (const [socketId, mappedUserId] of Object.entries(userSocketMap)) {
          if (mappedUserId === userId || mappedUserId==undefined) {
            delete userSocketMap[socketId];
          }
        }
        userSocketMap[socket.id] = userId;
        console.log('userSocketMap:', userSocketMap);
        console.log('soicket id', socket.id);
      })
    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})
export { app, io, server };