import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchFeed = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts/get-posts");
      const data = await response.json();
      setPosts(data);
      console.log(data[0]);
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
    <div className="w-[50%] mx-auto py-10">
      {posts.map((post) => (
        <div key={post.id} className="border-b border-gray-200 p-4">
          <div className="flex items-start">
            <img
              src={`https://picsum.photos/seed/${encodeURIComponent(
                post._id || post.user
              )}/200/300`}
              alt={post.user.name}
              className="w-12 h-12 rounded-full mr-4"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
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
      ))}
    </div>
  );
};

export default Feed;
