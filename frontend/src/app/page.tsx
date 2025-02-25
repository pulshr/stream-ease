"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Movie = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to StreamEase
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
          >
            <Image
              src={movie.thumbnail}
              alt={movie.title}
              width={300}
              height={200}
              className="rounded-md"
            />
            <h2 className="text-2xl font-semibold dark:text-gray-100">
              {movie.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {movie.description}
            </p>
            <Link href={`/movies/${movie._id}`}>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
