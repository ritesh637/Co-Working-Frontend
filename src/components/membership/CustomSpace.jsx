

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const quotes = [
  "Need A Custom Space?",
  "Tailor-Made Offices Just for You",
  "Workspaces That Fit Your Needs",
  "Flexible Solutions, Unlimited Potential",
];

const CustomSpace = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true);
      }, 500); 
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-purple-700 text-white py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/path-to-pattern.png')" }} 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-purple-600/80 backdrop-blur-sm" />

      
      <div className="relative z-10 text-center max-w-2xl">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {quotes[quoteIndex]}
        </h2>

        <Link
          href="/contact"
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-full text-lg shadow-md transition-all duration-300 hover:scale-105 hover:bg-purple-100"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default CustomSpace;
