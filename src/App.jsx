import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyResult from "./pages/MyResult";

function RequireAuth({ children }) {
  // check localStorage (or change to token check / context)
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  if (!isLoggedIn) {
    // send to login and store the attempted path in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* only /result is protected */}
      <Route
        path="/result"
        element={
          <RequireAuth>
            <MyResult />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
