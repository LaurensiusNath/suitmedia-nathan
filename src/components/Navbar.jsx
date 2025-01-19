import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Work", path: "/suitmedia-nathan/work" },
    { name: "About", path: "/suitmedia-nathan/about" },
    { name: "Services", path: "/suitmedia-nathan/services" },
    { name: "Ideas", path: "/suitmedia-nathan/ideas" },
    { name: "Careers", path: "/suitmedia-nathan/careers" },
    { name: "Contact", path: "/suitmedia-nathan/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed w-full transition-all duration-300 ${
        visible ? "top-0" : "-top-full"
      } ${
        prevScrollPos > 50
          ? "bg-orange-500/90 backdrop-blur-sm shadow-lg"
          : "bg-orange-500"
      } px-4 sm:px-20 py-4 flex justify-between items-center z-50`}
    >
      <div className="flex items-center">
        <img
          src={assets.suit_logo}
          alt="Logo"
          onClick={() => navigate("/ideas")}
          className="w-20 sm:w-32 cursor-pointer"
        />
      </div>

      <button
        className="sm:hidden text-white text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col sm:flex sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-white absolute sm:static top-16 left-0 w-full sm:w-auto bg-orange-500 sm:bg-transparent sm:py-0 py-4 sm:pl-0 pl-8 sm:shadow-none shadow-lg`}
      >
        {menuItems.map((item) => (
          <a
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setMenuOpen(false);
            }}
            className={`cursor-pointer py-2 hover:text-white/80 transition-colors ${
              location.pathname === item.path ? "border-b-4 border-white" : ""
            }`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
