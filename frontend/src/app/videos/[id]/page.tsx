"use client";

import { useState, useEffect } from "react";

type Video = {
  id: number;
  title: string;
  description: string;
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
      <p className="text-gray-500 text-center mt-10">
        Loading video details...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <p className="text-gray-700 text-lg">{video.description}</p>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => window.history.back()}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
