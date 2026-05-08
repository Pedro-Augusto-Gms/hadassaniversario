import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? <Home /> : <Login onLogin={() => setLoggedIn(true)} />;
}