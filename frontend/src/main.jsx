import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <KindeProvider
      clientId="6cc5143dd74f46c29d4afb98b03e97e6"
      domain="https://oneseen.kinde.com"
      redirectUri="http://localhost:5173/homepage"
      logoutUri="http://localhost:5173"
    >
      <App />
    </KindeProvider>
  </StrictMode>
);
