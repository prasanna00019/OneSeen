
// import React, { createContext, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
// export const SocketContext = createContext();
// export const SocketProvider = ({ children }) => {
//   const { user } = useKindeAuth();  
//   const socketRef = useRef(null); // Use a ref to maintain a single socket instance
//   const [socketId, setSocketId] = useState(null);
//   const [clickedId, setClickedId] = useState(null);
//   const [Authuser, setAuthuser] = useState(null);
//   useEffect(()=>{
//    if(user){ 
//     console.log(user);}
//   },[])
//   console.log('Authuser:',
//   Authuser);
//   console.log(clickedId,'clickedId...');
//   useEffect(() => {
//     if (!socketRef.current) {
//       // Initialize socket only once
//       socketRef.current = io('http://localhost:5000', {
//         query: {
//           Authuser: Authuser ?JSON.stringify(Authuser) : null, // Serialize the Authuser object
//           userId: clickedId ? clickedId : null, // Send the userId to the server
//         },
//         reconnection: true, // Enable reconnection
//       });

//       socketRef.current.on('connect', () => {
//         setSocketId(socketRef.current.id);
//         console.log('Connected to server:', socketRef.current.id);
//       });

//       socketRef.current.on('disconnect', () => {
//         console.log('Disconnected from server');
//       });
//     }

//     return () => {
//       // Cleanup the socket on component unmount
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, [user]); // Dependency array ensures reinitialization if Authuser changes

//   const value = {
//     socket: socketRef.current,
//     socketId,
//     clickedId,
//     setClickedId,
//     Authuser,
//     setAuthuser,
//   };

//   return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
// };

import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  const [clickedId, setClickedId] = useState(null);
  const [Authuser, setAuthuser] = useState(null);
  const socket = io('http://localhost:5000',{
    query:{userId:clickedId,Authuser:JSON.stringify(Authuser) || null},
 
  });
  const [socketId, setSocketId] = useState(null);
  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log('Connected with socket ID:', socket.id);
    });
    // socket.on('receive_message', (data) => {
    //   console.log('Received message:', data);
    // });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');  
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      // socket.off('receive_message');
    };
  }, []);

  const registerUser = (userId) => {
    socket.emit('register', userId);
    console.log(`Registered user with ID: ${userId}`);
  };
  const value = {
    socket,
    socketId,
    registerUser,
    clickedId,
    setClickedId,
    Authuser,
    setAuthuser,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
