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
    <div>
      <h1>Welcome to StreamEase</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <Link href={`/videos/${video.id}`}>
              <h2>{video.title}</h2>
            </Link>
            <p>{video.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
