import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/accounts/Login.jsx";
import Register from "./pages/accounts/Register.jsx";
import "./index.css";

const appTitle = import.meta.env.VITE_APP_NAME || 'Chatify';

document.getElementById('app-title').innerText = appTitle;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
