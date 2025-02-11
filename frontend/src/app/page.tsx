"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Video = {
  id: number;
  title: string;
  description: string;
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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to StreamEase
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold">{video.title}</h2>
            <p className="text-gray-600">{video.description}</p>
            <Link href={`/videos/${video.id}`}>
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
