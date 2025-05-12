import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md p-4 fixed w-full top-0 z-50">
      <div className="Lt container mx-auto flex justify-between lg:justify-center items-center">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl lg:-ml-[270px] font-bold text-blue-600">
              Nexa AI
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="Link hidden md:flex space-x-6 lg:ml-[200px]">
          <ScrollLink to="Home" smooth duration={800} className="cursor-pointer text-white hover:text-blue-600">
            Home
          </ScrollLink>
          <ScrollLink to="features" smooth duration={800} className="cursor-pointer text-white hover:text-blue-600">
            Services
          </ScrollLink>
          <ScrollLink to="Prices" smooth duration={800} className="cursor-pointer text-white hover:text-blue-600">
            Prices
          </ScrollLink>
          <ScrollLink to="contact" smooth duration={800} className="cursor-pointer text-white hover:text-blue-600">
            Contact
          </ScrollLink>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="Link hidden lg:translate-x-[250px] lg:block lg:space-x-4">
          <div className="flex items-center gap-4">
            <Link to="/signup">
              <button className="relative px-4 py-2 rounded-md border-2 border-blue-700 text-white font-semibold shadow-md transition duration-500 hover:border-red-500 hover:text-red-500">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="relative px-4 py-2 rounded-md border-2 border-blue-700 text-white font-semibold shadow-md transition duration-500 hover:border-red-500 hover:text-red-500">
                Log In
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex flex-col gap-2 w-8 md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`rounded-2xl h-[3px] w-1/2 bg-white transition-all duration-500 ${isOpen ? "rotate-[225deg] origin-right -translate-x-[12px] -translate-y-[1px]" : ""}`} />
          <div className={`rounded-2xl h-[3px] w-full bg-white transition-all duration-500 ${isOpen ? "rotate-[-225deg]" : ""}`} />
          <div className={`rounded-2xl h-[3px] w-1/2 bg-white transition-all duration-500 place-self-end ${isOpen ? "rotate-[225deg] origin-left translate-x-[12px] translate-y-[1px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="Link md:hidden absolute top-16 left-0 w-full bg-blue-300 shadow-md"
        >
          <div className="flex flex-col items-center space-y-4 p-4">
            <ScrollLink to="Home" smooth duration={800} onClick={() => setIsOpen(false)} className="cursor-pointer text-white hover:text-blue-600">
              Home
            </ScrollLink>
            <ScrollLink to="features" smooth duration={800} onClick={() => setIsOpen(false)} className="cursor-pointer text-white hover:text-blue-600">
              Services
            </ScrollLink>
            <ScrollLink to="Prices" smooth duration={800} onClick={() => setIsOpen(false)} className="cursor-pointer text-white hover:text-blue-600">
              Prices
            </ScrollLink>
            <ScrollLink to="contact" smooth duration={800} onClick={() => setIsOpen(false)} className="cursor-pointer text-white hover:text-blue-600">
              Contact
            </ScrollLink>
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-600">
              Log In
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-600">
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
