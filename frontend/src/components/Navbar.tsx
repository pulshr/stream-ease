import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">StreamEase</h1>
        <div className="space-x-6">
          <Link href="/">
            <a className="text-white hover:text-gray-300">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-white hover:text-gray-300">About</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
