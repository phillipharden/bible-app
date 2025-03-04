import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import FooterNav from "./components/FooterNav";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
      <div className="app-footer-nav">
        <FooterNav />
      </div>
    </div>
  );
}

export default App;
