// import React, { useEffect, useState } from "react";
// import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
// import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
// import axios from "axios";

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const { user } = useKindeAuth(); // Get user details

//   useEffect(() => {
//     fetchFeed();
//     const interval = setInterval(fetchFeed, 30000000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchFeed = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/posts/get-posts");
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   // Function to handle upvoting
//   const handleUpvote = async (postId) => {
//     if (!user) {
//       alert("You must be logged in to vote.");
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:5000/api/posts/upvote/${postId}`, {
//         userId: user.id, // Send user ID to API
//       });

//       // Update UI instantly
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? response.data.post : post
//         )
//       );
//     } catch (error) {
//       console.error("Error upvoting:", error);
//     }
//   };

//   // Function to handle downvoting
//   const handleDownvote = async (postId) => {
//     if (!user) {
//       alert("You must be logged in to vote.");
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:5000/api/posts/downvote/${postId}`, {
//         userId: user.id,
//       });

//       // Update UI instantly
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? response.data.post : post
//         )
//       );
//     } catch (error) {
//       console.error("Error downvoting:", error);
//     }
//   };

//   return (
//     <div className="w-[50%] mx-auto py-10">
//       {posts.map((post) => (
//         <div key={post._id} className="border-b border-gray-200 p-4">
//           <div className="flex items-start">
//             <img
//               src={`https://picsum.photos/seed/${encodeURIComponent(post._id)}/200/300`}
//               alt={post.user}
//               className="w-12 h-12 rounded-full mr-4"
//             />

//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <p className="text-gray-500 text-sm">@{post.user}</p>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(post.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <p className="mt-2 font-semibold">{post.title}</p>
//               <p className="text-gray-700">{post.description}</p>

//               <div className="mt-2 flex items-center space-x-6 text-gray-500">
//                 {/* Upvote Button */}
//                 <button
//                   onClick={() => handleUpvote(post._id)}
//                   className="flex items-center space-x-1 hover:text-blue-600 transition"
//                 >
//                   <ChevronUp className="w-4 h-4" />
//                   <span>{post.upvotes}</span>
//                 </button>

//                 {/* Downvote Button */}
//                 <button
//                   onClick={() => handleDownvote(post._id)}
//                   className="flex items-center space-x-1 hover:text-red-600 transition"
//                 >
//                   <ChevronDown className="w-4 h-4" />
//                   <span>{post.downvotes}</span>
//                 </button>

//                 {/* Comments Count */}
//                 <button className="flex items-center space-x-1">
//                   <MessageCircle className="w-4 h-4" />
//                   <span>{post.comments.length}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Search } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PostDialog from "../../components/postDialog/PostDialog";
import { Input } from "../../components/ui/input";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFeed = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts/get-posts");
      const data = await response.json();
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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex p-5 gap-3">
        <Input
          placeholder="Search..."
          className="rounded-full border-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="flex items-center gap-2 text-gray-500">
          <Search className="w-6 h-6" />
        </button>
      </div>
      <div className="w-[70%] mx-auto py-5 custom-scrollbar">
        {filteredPosts.map((post) => (
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


// import React, { useContext, useEffect, useState } from "react";
// import { ChevronDown, ChevronUp, MessageCircle, Search } from "lucide-react";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import PostDialog from "../../components/postDialog/PostDialog";
// import { Input } from "../../components/ui/input";
// import axios from "axios";
// import { SocketContext } from "../../../context/SocketContext";

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
// const {socket}=useContext(SocketContext);
//   useEffect(() => {
//     fetchFeed();

//     // Listen for real-time updates from the server
//     socket.on("postUpdated", (updatedPost) => {
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === updatedPost._id ? updatedPost : post
//         )
//       );
//     });

//     return () => {
//       socket.off("postUpdated"); // Cleanup listener when component unmounts
//     };
//   }, []);

//   const fetchFeed = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/posts/get-posts");
//       const sortedPosts = response.data.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setPosts(sortedPosts);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Handle upvote
//   const handleUpvote = async (postId) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/posts/upvote/${postId}`);
//       const updatedPost = response.data.post;

//       // Update state instantly
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? updatedPost : post
//         )
//       );

//       // Notify other clients via WebSockets
//       socket.emit("postUpdated", updatedPost);
//     } catch (error) {
//       console.error("Error upvoting:", error);
//     }
//   };

//   // Handle downvote
//   const handleDownvote = async (postId) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/posts/downvote/${postId}`);
//       const updatedPost = response.data.post;

//       // Update state instantly
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? updatedPost : post
//         )
//       );

//       // Notify other clients via WebSockets
//       socket.emit("postUpdated", updatedPost);
//     } catch (error) {
//       console.error("Error downvoting:", error);
//     }
//   };

//   return (
//     <div className="">
//       <div className="flex p-5 gap-3">
//         <Input placeholder="Search..." className="rounded-full border-2" />
//         <button className="flex items-center gap-2 text-gray-500">
//           <Search className="w-6 h-6" />
//         </button>
//       </div>
//       <div className="w-[70%] mx-auto py-5 custom-scrollbar">
//         {posts.map((post) => (
//           <Dialog key={post._id}>
//             <DialogTrigger>
//               <div className="border-b hover:cursor-pointer text-start border-gray-200 p-4">
//                 <div className="flex items-start">
//                   <img
//                     src={`https://picsum.photos/seed/${encodeURIComponent(
//                       post._id || post.user
//                     )}/200/300`}
//                     alt={post.user}
//                     className="w-12 h-12 rounded-full mr-4"
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center gap-5 justify-between">
//                       <p className="text-gray-500 text-sm">@{post.user}</p>
//                       <p className="text-gray-500 text-sm">
//                         {new Date(post.createdAt).toLocaleString()}
//                       </p>
//                     </div>
//                     <p className="mt-2">{post.title}</p>
//                     <p className="text-muted-foreground">{post.description}</p>
//                     <div className="mt-2 flex items-center space-x-6 text-gray-500">
//                       <button
//                         onClick={() => handleUpvote(post._id)}
//                         className="flex items-center space-x-1 hover:text-blue-600 transition"
//                       >
//                         <ChevronUp className="w-4 h-4" />
//                         <span>{post.upvotes}</span>
//                       </button>
//                       <button
//                         onClick={() => handleDownvote(post._id)}
//                         className="flex items-center space-x-1 hover:text-red-600 transition"
//                       >
//                         <ChevronDown className="w-4 h-4" />
//                         <span>{post.downvotes}</span>
//                       </button>
//                       <button className="flex items-center space-x-1">
//                         <MessageCircle className="w-3 h-3" />
//                         <span>{post.comments.length}</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </DialogTrigger>
//             <PostDialog post={post} />
//           </Dialog>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;
