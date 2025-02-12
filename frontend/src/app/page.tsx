"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail?: string; // Optional property for thumbnail URL
};

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to StreamEase
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
          >
            <Image
              src={`http://localhost:5000${
                video.thumbnail || "/no-image-icon.png"
              }`} // Thumbnail or fallback image
              alt={video.title}
              width={500} // Specify width and height for optimization
              height={300} // Adjust height as per your layout
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold dark:text-gray-100">
              {video.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {video.description}
            </p>
            <Link href={`/videos/${video.id}`}>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
