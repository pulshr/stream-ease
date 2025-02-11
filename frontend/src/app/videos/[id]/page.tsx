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
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!video) {
    return <p>Loading video details...</p>;
  }

  return (
    <div>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
    </div>
  );
}
