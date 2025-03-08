
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import {
  AlignLeft,
  LogOut,
  MessageCircleDashed,
  Plus,
  Settings2,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { changeRoute } from "../../slices/routeSlice";

const Sidebar = () => {
  const { user, logout } = useKindeAuth();
  const navigate = useNavigate();
  const [interval, setInterval] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const currentRoute = useSelector((state) => state.router.currentRoute);

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
      setIsDialogOpen(false);
    } catch (err) {
      toast.error("Error creating post: " + err.response.data.message);
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 5 && value <= 1440) {
      setInterval(value);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setTitle("");
      setDescription("");
      setInterval(5);
    }
  }, [isDialogOpen]);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="relative justify-between overflow-ellipsis flex h-screen w-full max-w-[15rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        {/* Header Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 p-4 mb-2">
            <img src={logo} alt="" />
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              OneSeen
            </h5>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="hover:cursor-pointer">
                <Plus /> New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Post</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSubmitPost}
                  type="submit"
                  className="hover:cursor-pointer"
                >
                  Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* Navigation Section */}
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <div
            role="button"
            className={`flex hover:cursor-pointer items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}
            onClick={() => {
              dispatch(changeRoute(0));
            }}
          >
            <div className="grid mr-4 place-items-center">
              <AlignLeft
                className={`w-5 h-5  ${
                  currentRoute == 0 ? "text-primary" : ""
                }`}
              />
            </div>
            <p className={` ${currentRoute == 0 ? "text-primary" : ""}`}>
              {" "}
              Feed
            </p>
          </div>
          <div
            role="button"
            className="flex hover:cursor-pointer items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            onClick={() => {
              dispatch(changeRoute(1));
            }}
          >
            <div className="grid mr-4 place-items-center">
              <MessageCircleDashed
                className={`w-5 h-5  ${
                  currentRoute == 1 ? "text-primary" : ""
                }`}
              />
            </div>
            <p className={` ${currentRoute == 1 ? "text-primary" : ""}`}>
              Inbox
            </p>
          </div>
          <div
            role="button"
            className="flex hover:cursor-pointer items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            onClick={() => {
              dispatch(changeRoute(2));
            }}
          >
            <div className="grid mr-4 place-items-center">
              <User
                className={`w-5 h-5  ${
                  currentRoute == 2 ? "text-primary" : ""
                }`}
              />
            </div>
            <p className={` ${currentRoute == 2 ? "text-primary" : ""}`}>
              Profile
            </p>
          </div>
          <div
            role="button"
            className="flex hover:cursor-pointer items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            onClick={() => {
              dispatch(changeRoute(3));
            }}
          >
            <div className="grid mr-4 place-items-center">
              <Settings2
                className={`w-5 h-5  ${
                  currentRoute == 3 ? "text-primary" : ""
                }`}
              />
            </div>
            <p className={` ${currentRoute == 3 ? "text-primary" : ""}`}>
              Settings
            </p>
          </div>
        </nav>
        {/* Footer Section */}
        <div className="flex">
          <a
            onClick={handleLogout}
            className="hover:cursor-pointer flex mr-3 items-center"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
