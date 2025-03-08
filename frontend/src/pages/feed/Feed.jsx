import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Search } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PostDialog from "../../components/postDialog/PostDialog";
import { Input } from "../../components/ui/input";
import axios from "axios";
import { SocketContext } from "../../../context/SocketContext";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const {user}=useKindeAuth();
  const { socket } = useContext(SocketContext);
  useEffect(()=>{
    fetchFeed();
  },[])
  useEffect(() => {
    socket.on("upvoted", (updatedPost) => {
      console.log("upvoted in sokcet ...", updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    });
    socket.on("downvote", (updatedPost) => {
      // console.log("in sokcet ...", updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    });
    
    socket.on("postUpdated", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    });
   socket.on("newPost", (newPost) => {
      console.log("newPost in sokcet ...", newPost);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });
    return () => {
      socket.off("newPost");
      socket.off("upvoted");
      socket.off("downvote");
      socket.off("postUpdated");
    };
  }, [socket]);

  const fetchFeed = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts/get-posts");
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpvote = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/upvote/${postId}`,{
        userId: user.id
      });
      const updatedPost = response.data.post;
      
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? updatedPost : post
        )
      );

      socket.emit("upvoted", updatedPost);
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/downvote/${postId}`,{
        userId: user.id
      });
      const updatedPost = response.data.post;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? updatedPost : post
        )
      );
      socket.emit("downvote", updatedPost);
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  return (
    <div>
      <div className="flex p-5 gap-3">
        <Input placeholder="Search..." className="rounded-full border-2" />
        <button className="flex items-center gap-2 text-gray-500">
          <Search className="w-6 h-6" />
        </button>
      </div>

      <div className="w-[70%] mx-auto py-5 custom-scrollbar">
        {posts.map((post) => (
          <Dialog key={post._id}>
            <DialogTrigger>
              <span className="block border-b hover:cursor-pointer text-start border-gray-200 p-4">
                <div className="flex items-start">
                  <img
                    src={`https://picsum.photos/seed/${encodeURIComponent(
                      post._id || post.user
                    )}/200/300`}
                    alt={post.user}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-5 justify-between">
                      <p className="text-gray-500 text-sm">@{post.user}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-2">{post.title}</p>
                    <p className="text-muted-foreground">{post.description}</p>
                    <div className="mt-2 flex items-center space-x-6 text-gray-500">
                      <button
                        onClick={() => handleUpvote(post._id)}
                        className="flex items-center space-x-1 hover:text-blue-600 transition"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>{post.upvotes}</span>
                      </button>
                      <button
                        onClick={() => handleDownvote(post._id)}
                        className="flex items-center space-x-1 hover:text-red-600 transition"
                      >
                        <ChevronDown className="w-4 h-4" />
                        <span>{post.downvotes}</span>
                      </button>
                      <button className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </span>
            </DialogTrigger>

            <PostDialog post={post} />
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Feed;
