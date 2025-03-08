import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import ChatAside from './ChatAside';
import { SocketContext } from '../../../context/SocketContext';
import { set } from 'mongoose';

const Message = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { clickedId, setClickedId } = useContext(SocketContext);
  const { user } = useKindeAuth();
  const { registerUser } = useContext(SocketContext)
  useEffect(() => {
    if (clickedId) {
      registerUser(user.id)
    }
  }, [clickedId])
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/all-users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error getting all users:', error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="flex">
      {/* User List */}
      <div className="w-1/3 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <ul>
          {users.map((u) => (
            u.email !== user.email && (
              <li
                key={u._id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => { setSelectedUser(u); setClickedId(u.username) }}
              >
                {u.username}
              </li>
            )
          ))}
        </ul>
      </div>

      {/* Chat Aside Component */}
      {selectedUser && <ChatAside selectedUser={selectedUser} authUser={user} />}
    </div>
  );
};

export default Message;
