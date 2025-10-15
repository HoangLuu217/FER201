// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";

export default function HomePage() {
  return (
    <div className="mb-5">
      <HomeCarousel />
      <div className="text-center mt-5 mb-4">
        <h2>Welcome to Movie App</h2>
        <p className="text-secondary">
          Discover our handpicked selection of the best movies from around the world
        </p>
      </div>
    </div>
  );
}
