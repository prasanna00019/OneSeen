import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SocketContext } from "../../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Send } from "lucide-react";

const ChatAside = ({ selectedUser, authUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const { user } = useKindeAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("selectedUser:", selectedUser);
    console.log("authUser:", authUser);
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("received message from server:", msg);
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("disappearMessage", (id) => {
      console.log("disappearing message:", id);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    });
    return () => {
      socket.off("receiveMessage");
      socket.off("disappearMessage");
    };
  }, [socket]);
  useEffect(() => {
    const fetchMessages = async () => {
      console.log(
        "fetching messages between:",
        authUser.id,
        selectedUser.username
      );
      try {
        const response = await axios.get(
          `https://oneseen.onrender.com/api/messages/get-messages/${authUser.id}/${selectedUser.username}`
        );
        console.log("response:", response);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [selectedUser, authUser]);
  const handleDisappearMessage = async (id, flag, msg) => {
    try {
      console.log(flag, " flag");
      if (!flag) {
        console.log("disappearing message:", id, flag);
        socket.emit("disappearMessage", { id, msg });
      }
      // setMessages(messages.filter((msg)=>msg._id!==id));
    } catch (error) {
      console.error("Error disappearing message:", error);
    }
  };
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      socket.emit("sendMesage", {
        sender: authUser.id,
        recipient: selectedUser.username,
        message: newMessage,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      // setMessages([...messages, { sender: authUser.id, message: newMessage,recipient:selectedUser.username,_id:"...." }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="w-2/3 p-4 border-l h-screen flex flex-col justify-between">
      <div className="">
        <h2 className="text-lg font-semibold">@{selectedUser.username}</h2>
        <div className="h-100 overflow-y-auto p-2 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 ${
                msg.sender === authUser._id ? "text-right" : "text-left"
              } flex gap-2`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === authUser.id
                    ? "bg-primary text-white ml-[300px]"
                    : "bg-gray-200"
                }`}
              >
                https://oneseen.onrender.com/message/{msg._id}
              </span>
              <span
                onClick={() => {
                  window.open(`/message/${msg._id}`, "_blank");
                  handleDisappearMessage(
                    msg._id,
                    user.id === msg.sender ? true : false,
                    msg
                  );
                }}
                className="inline-block p-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                ➡
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end mt-4">
        <input
          type="text"
          className="flex-1 rounded-xl border p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="text-black py-2 px-4 ml-2 rounded-xl"
          onClick={sendMessage}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatAside;
