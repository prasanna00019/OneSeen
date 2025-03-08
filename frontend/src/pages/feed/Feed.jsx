// import React, { useContext, useEffect, useState } from "react";
// import { ChevronDown, ChevronUp, MessageCircle, Search, Trash } from "lucide-react";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import PostDialog from "../../components/postDialog/PostDialog";
// import { Input } from "../../components/ui/input";
// import axios from "axios";
// import { SocketContext } from "../../../context/SocketContext";
// import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const {user}=useKindeAuth();
//   const { socket } = useContext(SocketContext);
//   useEffect(()=>{
//     fetchFeed();
//   },[])
//   useEffect(() => {
//     socket.on("upvoted", (updatedPost) => {
//       console.log("upvoted in sokcet ...", updatedPost);
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === updatedPost._id ? updatedPost : post
//         )
//       );
//     });
//     socket.on('disappearPost', (postId) => {
//       console.log('disappearPost in sokcet ...', postId);
//       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
//     })
//     socket.on("downvote", (updatedPost) => {
//       // console.log("in sokcet ...", updatedPost);
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === updatedPost._id ? updatedPost : post
//         )
//       );
//     });
    
//     socket.on("postUpdated", (updatedPost) => {
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === updatedPost._id ? updatedPost : post
//         )
//       );
//     });
//    socket.on("newPost", (newPost) => {
//       console.log("newPost in sokcet ...", newPost);
//       setPosts((prevPosts) => [newPost, ...prevPosts]);
//     });
//     return () => {
//       socket.off("newPost");
//       socket.off("upvoted");
//       socket.off("downvote");
//       socket.off("postUpdated");
//     };
//   }, [socket]);
//   const handleDelete = async (postId) => {
//     try {
//       // Make your delete API call here
//       await axios.delete(`https://oneseen.onrender.com/api/posts/delete/${postId}`);
//       setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };
//   const fetchFeed = async () => {
//     try {
//       const response = await axios.get("https://oneseen.onrender.com/api/posts/get-posts");
//       const sortedPosts = response.data.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setPosts(sortedPosts);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpvote = async (postId) => {
//     try {
//       const response = await axios.put(`https://oneseen.onrender.com/api/posts/upvote/${postId}`,{
//         userId: user.id
//       });
//       const updatedPost = response.data.post;
      
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? updatedPost : post
//         )
//       );

//       socket.emit("upvoted", updatedPost);
//     } catch (error) {
//       console.error("Error upvoting:", error);
//     }
//   };

//   const handleDownvote = async (postId) => {
//     try {
//       const response = await axios.put(`https://oneseen.onrender.com/api/posts/downvote/${postId}`,{
//         userId: user.id
//       });
//       const updatedPost = response.data.post;
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? updatedPost : post
//         )
//       );
//       socket.emit("downvote", updatedPost);
//     } catch (error) {
//       console.error("Error downvoting:", error);
//     }
//   };

//   return (
//     <div>
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
//               <span className="block border-b hover:cursor-pointer text-start border-gray-200 p-4">
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
//                       <button>
//                       {post.user===user.id && <Trash/>}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </span>
//             </DialogTrigger>
//             <PostDialog post={post} />
//           </Dialog>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;

import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Pen, Search, Trash } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PostDialog from "../../components/postDialog/PostDialog";
import { Input } from "../../components/ui/input";
import editedthreads from '../../assets/image.png'
import axios from "axios";
import { SocketContext } from "../../../context/SocketContext";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { toast } from "sonner";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user,isAuthenticated } = useKindeAuth();
  const { socket } = useContext(SocketContext);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, seteditDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [posttoedit, setPosttoedit] = useState(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
        socket.on("upvoted", (updatedPost) => {
          console.log("upvoted in sokcet ...", updatedPost);
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === updatedPost._id ? updatedPost : post
            )
          );
        });
        socket.on('disappearPost', (postId) => {
          console.log('disappearPost in sokcet ...', postId);
          setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        })
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
        socket.on('postDeleted', (postId) => {
          console.log('deletedPost in sokcet ...', postId);
          setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        })
        socket.on('EditImage', (updatedPost) => {
          console.log('EditImage in sokcet ...', updatedPost);
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === updatedPost.data._id ? updatedPost.data : post
            )
          );
        })
        return () => {
          socket.off("newPost");
          socket.off("EditImage");
          socket.off("upvoted");
          socket.off("disappearPost");
          socket.off("deletedPost");
          socket.off("downvote");
          socket.off("postUpdated");
        };
      }, [socket]);

  const fetchFeed = async () => {
    try {
      const response = await axios.get("https://oneseen.onrender.com/api/posts/get-posts");
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (postId, type) => {
    try {
      if(!isAuthenticated){
       toast.error('Please login to vote',{duration:2000},);
       }
      const endpoint = type === 'upvote' ? 'upvote' : 'downvote';
      const response = await axios.put(
        `https://oneseen.onrender.com/api/posts/${endpoint}/${postId}`,
        { userId: user.id }
      );
      const updatedPost = response.data.post;
      
      setPosts(prevPosts => prevPosts.map(post => 
        post._id === postId ? updatedPost : post
      ));

      socket.emit(endpoint === 'upvote' ? 'upvoted' : 'downvote', updatedPost);
    } catch (error) {
      console.error(`Error ${type}ing:`, error);
    }
  };

  const handleDelete = async () => {
    console.log('postToDelete:', postToDelete);
    if (!postToDelete) return;
    try {
      const response= await axios.delete(`https://oneseen.onrender.com/api/posts/delete-post/${postToDelete}`);
      // setPosts(prevPosts => prevPosts.filter(post => post._id !== postToDelete));
      const postid=response.data.postId;
      socket.emit('postDeleted',postid)
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
const handleEditPost= async () => {
  console.log('posttoedit:', posttoedit);
  if (!posttoedit) return;
  try {
   const response= await axios.put(`https://oneseen.onrender.com/api/posts/edit-post/${posttoedit._id}`,{
      title:posttoedit.title,
      description:posttoedit.description,
      media:posttoedit.media
    });
    // setPosts(prevPosts => prevPosts.filter(post => post._id !== posttoedit._id));
    socket.emit('EditImage',response)
    seteditDialogOpen(false);
  } catch (error) {
    console.error("Error editing post:", error);
  }
}
  return (
    <div>
      <div className="flex p-5 gap-3">
        <Input placeholder="Search..." className="rounded-full border-2" />
        <button className="flex items-center gap-2 text-gray-500">
          <Search className="w-6 h-6" />
        </button>
      </div>

      <div className="w-[70%] mx-auto py-5 custom-scrollbar">
        {posts.length===0?(
 <div className="">
 <p className="text-center text-gray-500">No latest feed found.</p>
</div>        ):posts.map((post) => (
          <div 
            key={post._id}
            className="border-b hover:cursor-pointer text-start border-gray-200 p-4"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-start">
              <img
                src={`https://picsum.photos/seed/${encodeURIComponent(post._id)}/200/300`}
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
                <p className="mt-2 font-medium">{post.title}</p>
                <p className="text-muted-foreground">{post.description}</p>
                {post?.media && 
                 <img onClick={(e)=>{e.stopPropagation();}} src={post.media} width={"100%"} alt="" />
                 }
                <div className="mt-2 flex items-center space-x-6 text-gray-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(post._id, 'upvote');
                    }}
                    className="flex items-center space-x-1 hover:text-blue-600 transition"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>{post.upvotes}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(post._id, 'downvote');
                    }}
                    className="flex items-center space-x-1 hover:text-red-600 transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                    <span>{post.downvotes}</span>
                  </button>
                  <button 
                    className="flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments.length}</span>
                  </button>
                  {post.user === user?.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPostToDelete(post._id);
                        setDeleteDialogOpen(true);
                      }}
                      className="hover:text-red-600 transition"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                  {post.user === user?.id && 
                   
                  (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPosttoedit(post);
                        seteditDialogOpen(true);
                      }}
                      className="hover:text-red-600 transition"
                    >
    <Pen size={24} color="blue" />
    {post.isEdited && <img
     onClick={(e)=>{e.stopPropagation();toast.message("This post was Edited")}}
    src={editedthreads} className="ml-8" width={70} alt="" />}
    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
    
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {handleDelete()}}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/* <Dialog open={editDialogOpen} onOpenChange={seteditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Edit</DialogTitle>
            <DialogDescription>
              Are you sure you want to edit this post? 
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => {seteditDialogOpen(false);setPosttoedit(null)}}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleEditPost}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Edit
            </button>
          </div>
        </DialogContent>
      </Dialog> */}
<Dialog open={editDialogOpen} onOpenChange={seteditDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogDescription>
        Modify your post details below and confirm the changes.
      </DialogDescription>
    </DialogHeader>

    {/* Editable Input Fields */}
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={posttoedit?.title || ""}
          onChange={(e) => setPosttoedit({ ...posttoedit, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={posttoedit?.description || ""}
          onChange={(e) => setPosttoedit({ ...posttoedit, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          rows="3"
        />
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end space-x-2 mt-4">
      <button
        onClick={() => {
          seteditDialogOpen(false);
          setPosttoedit(null);
        }}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        onClick={handleEditPost}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  </DialogContent>
</Dialog>

      {/* Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPost && (
            <PostDialog 
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Feed;