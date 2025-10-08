// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";
import MovieCard from "../components/movie/MovieCard";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2>Featured Movies Collections</h2>
          <p className="text-secondary">
            Discover our handpicked selection of the best movies from around the world
          </p>
        </div>
        <MovieCard />
      </div>
    </div>
  );
}
