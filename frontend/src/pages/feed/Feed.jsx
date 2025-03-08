import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Search } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PostDialog from "../../components/postDialog/PostDialog";
import { Input } from "../../components/ui/input";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchFeed = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts/get-posts");
      const data = await response.json();
      // Sort posts by createdAt in descending order
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="flex p-5 gap-3">
        <Input placeholder="Search..." className="rounded-full border-2" />
        <button className="flex items-center gap-2 text-gray-500">
          <Search className="w-6 h-6" />
        </button>
      </div>
      <div className="w-[70%] mx-auto py-5 custom-scrollbar">
        {posts.map((post) => (
          <Dialog key={post.id}>
            <DialogTrigger>
              <div className="border-b hover:cursor-pointer text-start border-gray-200 p-4">
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
                      <div>
                        <p className="text-gray-500 text-sm">@{post.user}</p>
                      </div>
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
            </DialogTrigger>
            <PostDialog post={post} />
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Feed;
