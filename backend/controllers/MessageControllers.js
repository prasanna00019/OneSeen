import MessageModel from "../models/MessageModel.js";
export const createMessage = async (req, res) => {
    try {
        const { message, sender, recipient, expiresAt } = req.body;
        const newmessage = new MessageModel({
            message,
            sender,
            recipient,
            expiresAt
        });
        const createdMessage = await newmessage.save();
        res.status(201).json(createdMessage);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const EditMessageById = async (req, res) => {
    try {
        const { Message } = req.body;
        const messageId = req.params.messageId;
        const message = await MessageModel.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        if (message.message === Message) {
            return res.status(400).json({ message: "No changes detected" });
        }
        else {
            message.message = Message;
            const updatedMessage = await message.save();
            res.status(200).json(updatedMessage);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const GetMessagesBetweenTwoUsers = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        // Fetch messages where (sender=senderId & recipient=receiverId) OR (sender=receiverId & recipient=senderId)
        const messages = await MessageModel.find({
            $or: [
                { sender: senderId, recipient: receiverId },
                { sender: receiverId, recipient: senderId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by time (oldest first)

        res.status(200).json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const DeleteMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const message = await MessageModel.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        await MessageModel.findByIdAndDelete(messageId);
        res.status(200).json({ message: "Message deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const GetMesssageById = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const message = await MessageModel
            .findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}