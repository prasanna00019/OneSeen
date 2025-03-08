import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../context/SocketContext";

const ViewMessage = () => {
  const { messageId } = useParams();
  const [messageData, setMessageData] = useState(null);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const storedMessage = sessionStorage.getItem("deletedMessage");
    if (storedMessage) {
      const parsedMessage = JSON.parse(storedMessage);
      setMessageData(parsedMessage);

      if (parsedMessage.expiresAt) {
        const expiryTime = new Date(parsedMessage.expiresAt).getTime();
        const currentTime = Date.now();
        const timeRemaining = expiryTime - currentTime;

        if (timeRemaining <= 0) {
          // Message is already expired, remove it immediately
          sessionStorage.removeItem("deletedMessage");
          setMessageData(null);
        } else {
          // Schedule removal when expiry time is reached
          setTimeout(() => {
            sessionStorage.removeItem("deletedMessage");
            setMessageData(null);
            console.log("Message expired and removed from sessionStorage.");
          }, timeRemaining);
        }
      }
    }
  }, []);

  useEffect(() => {
    socket.on("disappearMessage", (msg) => {
      console.log("msg deleted from view message", msg);
    });

    return () => {
      socket.off("disappearMessage");
    };
  }, [socket]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {!messageData ? (
          <p className="text-center text-gray-500">This message has expired or does not exist.</p>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Message Details</h2>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-lg text-gray-700">📩 <strong>Message:</strong> {messageData?.message}</p>
              <p className="text-sm text-gray-500">✍️ <strong>Sender:</strong> {messageData?.sender}</p>
              <p className="text-sm text-gray-500">🎯 <strong>Recipient:</strong> {messageData?.recipient}</p>
              <p className="text-sm text-gray-500">⏳ <strong>Expires At:</strong> {new Date(messageData?.expiresAt).toLocaleString()}</p>
              <p className="text-sm text-gray-500">📌 <strong>Read:</strong> {!messageData?.isRead ? "Yes" : "No"}</p>
              <p className="text-sm text-gray-500">✏️ <strong>Edited:</strong> {messageData?.isEdited ? "Yes" : "No"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMessage;
