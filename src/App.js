import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./Pages/Game";
import SignUp from "./Pages/SignUp";
import AddReview from "./Pages/AddReview";
import Favorites from "./Pages/Favorites";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Welcome from "../src/Pages/Welcome";

import Cookies from "js-cookie";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />

        <Route
          path='/home'
          element={<Home token={token} setUser={setUser} />}
        />
        <Route
          path='/game/:id'
          element={<Game token={token} setUser={setUser} />}
        />
        <Route
          path='/login'
          element={<Login token={token} setUser={setUser} />}
        />
        <Route path='/signup' element={<SignUp setUser={setUser} />} />
        <Route
          path='/addreview/:id'
          element={<AddReview token={token} setUser={setUser} />}
        />
        <Route
          path='/favorites'
          element={<Favorites token={token} setUser={setUser} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
