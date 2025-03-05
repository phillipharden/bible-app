import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiSolidBible } from "react-icons/bi";
import { PiFilesFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "../css/Nav.css";

const Nav = () => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/Bible") {
        const currentScrollY = window.scrollY;
        const atBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if (currentScrollY < lastScrollY || atBottom) {
          setVisible(true); // Show nav when scrolling down or at bottom
        } else {
          setVisible(false); // Hide nav when scrolling up
        }
        lastScrollY = currentScrollY;
      } else {
        setVisible(true); // Always show nav on other pages
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div className={`nav ${visible ? "nav-show" : "nav-hide"}`}>
      <div className="nav-body container">
        <NavLink
          to="/Home"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          <AiFillHome className="nav-icon" />
          <p className="nav-text">Home</p>
        </NavLink>
        <NavLink
          to="/Bible"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          <BiSolidBible className="nav-icon" />
          <p className="nav-text">Bible</p>
        </NavLink>
        <NavLink
          to="/Plans"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          <PiFilesFill className="nav-icon" />
          <p className="nav-text">Plans</p>
        </NavLink>
        <NavLink
          to="/Discover"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          <FaSearch className="nav-icon" />
          <p className="nav-text">Discover</p>
        </NavLink>
        <NavLink
          to="/More"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          <GiHamburgerMenu className="nav-icon" />
          <p className="nav-text">More</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
