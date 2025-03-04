import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import "../css/FooterNav.css";

const FooterNav = () => {
  return (
    <div className="footer-nav">
      <div className="footer-nav-body">
        <Link to="/Home" className="footer-nav-link">
          <AiFillHome className="footer-nav-icon" />
          <p className="footer-nav-text">Home</p>
        </Link>
      </div>
    </div>
  );
};

export default FooterNav;
