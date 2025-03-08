import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { SocketProvider } from '../context/SocketContext.jsx'
import { store } from "../store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
    <KindeProvider
      clientId="6cc5143dd74f46c29d4afb98b03e97e6"
      domain="https://oneseen.kinde.com"
      redirectUri="http://localhost:5173/homepage"
      logoutUri="http://localhost:5173"
      >
              <Provider store={store}>
      <App />
      </Provider>
    </KindeProvider>
      </SocketProvider>
  </StrictMode>
);
