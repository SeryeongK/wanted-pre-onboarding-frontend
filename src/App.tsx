import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Todo from "./pages/ToDo";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
