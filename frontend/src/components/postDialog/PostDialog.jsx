import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { SocketContext } from "../../../context/SocketContext";

const PostDialog = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("newComment", (newcomment) => {
      console.log("newcomment socket ... ", newcomment);
      setComments((prevComments) => [newcomment, ...prevComments]);
    });
    return () => socket.off("newComment");
  }, [socket]);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://oneseen.onrender.com/api/comments/create-comment/${post._id}`,
        {
          userId: post.user,
          comment,
        }
      );
      setComment("");
      if (response.status == 201) {
        const newcomm = response.data;
        socket.emit("newComment", newcomm);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://oneseen.onrender.com/api/comments/get-comments/${post._id}`
      );
      const data = response.data;
      const sortedComments = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [post._id]);

  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex items-center gap-1 pb-2">
          <img
            src={`https://picsum.photos/seed/${encodeURIComponent(
              post._id || post.user
            )}/200/300`}
            alt={post.user.name}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm text-gray-600">{post.user}</span>
          <span className="ml-auto text-sm text-gray-600"></span>
        </div>
        <DialogTitle>{post.title}</DialogTitle>
        <DialogDescription>{post.description}</DialogDescription>
        <div className="mt-2 flex items-center space-x-6 text-gray-500">
          <button className="flex items-center space-x-1">
            <ChevronUp className="w-3 h-3" />
            <span>{post.upvotes}</span>
          </button>
          <button className="flex items-center space-x-1">
            <ChevronDown className="w-3 h-3" />
            <span>{post.downvotes}</span>
          </button>
          <button className="flex items-center space-x-1">
            <MessageCircle className="w-3 h-3" />
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center space-x-1">
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>
        </div>
        <div className="pt-2 flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
            className="w-full border border-gray-300 rounded-full p-2"
          />
          <Send
            className="w-5 h-5 text-gray-500"
            onClick={handleCommentSubmit}
          />
        </div>
        <div className="mt-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col gap-2 border-b border-gray-200 p-2"
            >
              <div className="flex items-center gap-1">
                <img
                  src={`https://picsum.photos/seed/${encodeURIComponent(
                    comment.user
                  )}/200/300`}
                  alt={comment.user.name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm text-gray-600">{comment.user}</span>
              </div>
              <div className="text-sm text-gray-600">{comment.comment}</div>
              <div className="flex items-center gap-3 text-gray-500">
                <button className="flex items-center space-x-1">
                  <ChevronUp className="w-3 h-3" />
                  <span>{comment.upvotes}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <ChevronDown className="w-3 h-3" />
                  <span>{comment.downvotes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default PostDialog;
