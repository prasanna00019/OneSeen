import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import React from "react";

const Homepage = () => {
  const { user } = useKindeAuth();
  console.log(user);
  return (
    <div>
      <h1>Welcome to OneSeen, {user?.id}! You are now on the homepage.</h1>
    </div>
  );
};

export default Homepage;
