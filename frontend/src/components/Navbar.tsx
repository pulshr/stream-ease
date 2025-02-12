"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-primary p-4 sticky top-0 z-50 shadow-md text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">StreamEase</h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm">{theme === "light" ? "☀️" : "🌙"}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="sr-only"
          />
          <div className="w-10 h-5 bg-gray-300 rounded-full dark:bg-gray-700">
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                theme === "dark" ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      </div>
      <button
        onClick={handleLogout}
        className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
}
