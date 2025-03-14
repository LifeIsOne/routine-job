import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import LoginSuccess from "./pages/Login/LoginSuccess";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
