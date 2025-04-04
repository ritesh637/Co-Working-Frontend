"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { logoutUser } from "../lib/auth";
import { useCart } from "../lib/CartContext";
import { BiShoppingBag } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cart = [] } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    Cookies.remove("token");
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
    setIsMenuOpen(false); // Close menu on logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div>
          <Link href="/">
            <img
              src="https://live.templately.com/wp-content/uploads/2020/09/5b956696-spacehub_.png"
              alt="Space Hub Logo"
              className="w-36 sm:w-48"
              onClick={closeMenu}
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full bg-white shadow-lg md:shadow-none p-4 md:p-0 md:flex justify-center items-center md:space-x-6 z-50`}
        >
          <div className="space-y-4 md:space-y-0 md:flex md:space-x-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-blue-600 py-2 md:py-0"
            >
              HOME
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-blue-600 py-2 md:py-0"
            >
              ABOUT
            </Link>
            <Link
              href="/location"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-blue-600 py-2 md:py-0"
            >
              LOCATION
            </Link>
            <Link
              href="/workspace"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-blue-600 py-2 md:py-0"
            >
              WORKSPACE
            </Link>
            <Link
              href="/membership"
              onClick={closeMenu}
              className="block text-blue-600 py-2 md:py-0"
            >
              MEMBERSHIP
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-blue-600 py-2 md:py-0"
            >
              CONTACT
            </Link>
          </div>
        </nav>

        {/* Actions for Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-blue-600"
          >
            <BiShoppingBag className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
