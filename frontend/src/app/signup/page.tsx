"use client"; // This is important to use the client-side hooks

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct way to use useRouter in app directory

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // useRouter works only inside client components

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("User registered successfully!");
      setTimeout(() => router.push("/login"), 2000); // Redirect to login after 2 seconds
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Signup</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Signup
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
