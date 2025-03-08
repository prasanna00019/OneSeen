import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../feed/Feed";
import Profile from "../profile/Profile";
import Inbox from "../inbox/Inbox";
import Settings from "../settings/Settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import axios from "axios";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const Homepage = () => {
  const dispatch = useDispatch();
  const { user } = useKindeAuth();
  const currentRoute = useSelector((state) => state.router.currentRoute);
  const [interval, setInterval] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 5 && value <= 1440) {
      setInterval(value);
    }
  };

  const handleSubmitPost = async () => {
    if (title.length === 0 || description.length === 0) {
      return toast.error("Please fill up all details before posting.");
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/create-post",
        {
          description,
          title,
          interval: interval * 60,
          userId: user.id,
        }
      );
      toast.success("Post created successfully!");
      // setIsDialogOpen(false);
    } catch (err) {
      toast.error("Error creating post: " + err.response);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/get-post-of-a-user/${user.id}`
      );
      const posts = response.data;
      const sortedPosts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUserPosts(sortedPosts);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [user.id]);

  return (
    <div className="flex h-screen">
      {/* Sidebar: Fixed to the left, Full Height */}
      <div className="w-64 h-screen overflow-hidden fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content: Push content to the right and allow scrolling */}
      <div className="flex-1 ml-64 overflow-y-auto h-screen">
        <Toaster />
        {currentRoute == 0 ? (
          <Feed />
        ) : currentRoute == 1 ? (
          <Inbox />
        ) : currentRoute == 2 ? (
          <Profile />
        ) : (
          <Settings />
        )}
      </div>
      <div className="py-10 px-5 border h-screen shadow-lg">
        <div className="grid gap-4 p-4 border">
          <h1 className="text-2xl pb-5 font-bold">Share your thoughts</h1>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
              placeholder="Type your message here."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interval" className="text-right">
              Expiry (min)
            </Label>
            <Input
              id="interval"
              type="number"
              value={interval}
              onChange={handleIntervalChange}
              className="col-span-3"
              min="5"
              max="1440"
            />
          </div>
          <Button onClick={handleSubmitPost} className="hover:cursor-pointer">
            Share
          </Button>
        </div>

        {/* Scrollable "Your Sharings" Section */}
        <div className="mt-4 overflow-y-auto max-h-96 border p-4">
          <h2 className="text-2xl pb-5 font-bold">Recent Activity</h2>
          {userPosts.map((post, index) => (
            <div key={index} className="border-b p-5 mb-2">
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
                    <p className="text-gray-500 text-sm">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-2">{post.title}</p>
                  <p className="text-muted-foreground">{post.description}</p>
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
