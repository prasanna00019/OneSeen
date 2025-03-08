import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewMessage = () => {
  const { messageId } = useParams();
  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/get-message-by-id/${messageId}`
        );
        setMessageData(response.data);
      } catch (err) {
        console.error("Error fetching message:", err);
        setError("Failed to fetch message. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [messageId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Message Details</h2>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-lg text-gray-700">📩 <strong>Message:</strong> {messageData.message}</p>
              <p className="text-sm text-gray-500">✍️ <strong>Sender:</strong> {messageData.sender}</p>
              <p className="text-sm text-gray-500">🎯 <strong>Recipient:</strong> {messageData.recipient}</p>
              <p className="text-sm text-gray-500">⏳ <strong>Expires At:</strong> {new Date(messageData.expiresAt).toLocaleString()}</p>
              <p className="text-sm text-gray-500">📌 <strong>Read:</strong> {messageData.isRead ? "Yes" : "No"}</p>
              <p className="text-sm text-gray-500">✏️ <strong>Edited:</strong> {messageData.isEdited ? "Yes" : "No"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMessage;
