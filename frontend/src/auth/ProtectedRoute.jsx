import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import axios from 'axios';

const ProtectedRoute = () => {
  const { isLoading, isAuthenticated, user, login } = useKindeAuth();
  const navigate =useNavigate();
  const checkUsernameInDB = async (username) => {
    try {
      const response = await axios.get(`https://oneseen.onrender.com/api/auth/check-username/${username}`);
      return response.data.message === "User already exists";
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  useEffect(() => {
    const registerUser = async () => {
      if (isAuthenticated) {
        const exists = await checkUsernameInDB(user.username);
        if (!exists) {
          try {
            await axios.post('https://oneseen.onrender.com/api/auth/register', {
              username: user.id,
              email: user.email,
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    registerUser();
  }, [isAuthenticated]); // Only runs when authentication status changes

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : navigate('/anonymous');
};

export default ProtectedRoute;
