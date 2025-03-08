
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../feed/Feed";
import Profile from "../profile/Profile";
import Inbox from "../inbox/Inbox";
import Settings from "../settings/Settings";

const Homepage = () => {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state) => state.router.currentRoute);

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
    </div>
  );
};

export default Homepage;
