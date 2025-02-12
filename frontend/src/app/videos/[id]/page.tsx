"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image from next/image

type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail?: string; // Optional thumbnail URL
};

export default function VideoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [video, setVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/videos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Video not found");
          }
          return response.json();
        })
        .then((data) => setVideo(data))
        .catch((error) => setError(error.message));
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!video) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
        Loading video details...
      </p>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
        {/* Display Video Thumbnail */}
        {video.thumbnail && (
          <Image
            src={`http://localhost:5000${video.thumbnail}`} // Construct the full thumbnail URL
            alt={video.title}
            width={800}
            height={450}
            className="w-full h-auto rounded-md mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">
          {video.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          {video.description}
        </p>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
          onClick={() => window.history.back()}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
