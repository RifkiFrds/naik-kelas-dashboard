import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-950 text-white py-6 px-6 rounded-t-3xl shadow-inner">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Left */}
        <p className="text-sm text-gray-300 flex items-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by{" "}
          <a
            href="https://www.instagram.com/sore.inspirasi/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:underline hover:text-pink-400 transition"
          >
            SoreTeam
          </a>
        </p>

        {/* Right */}
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Naik Kelas. All rights reserved.</p>
      </div>
    </footer>
  );
}
