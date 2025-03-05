import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { MovieContextProvider } from "./context/MovieContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MovieContextProvider>
          <App />
        </MovieContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
