import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import ProtectedRoute from "./auth/ProtectedRoute";
import Homepage from "./pages/homepage/Homepage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/homepage" element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
