import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Bible from "./pages/Bible";
import Plans from "./pages/Plans";
import Discover from "./pages/Discover";
import More from "./pages/More";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="app">
      <Nav />
      <div className="app-body">
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Bible" element={<Bible />} />
            <Route path="/Plans" element={<Plans />} />
            <Route path="/Discover" element={<Discover />} />
            <Route path="/More" element={<More />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
