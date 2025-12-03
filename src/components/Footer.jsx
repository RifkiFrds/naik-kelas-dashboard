import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#000B2C] 
      text-white py-6 px-6 rounded-t-3xl shadow-inner">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

        {/* Made By */}
        <p className="text-sm text-white/80 flex items-center gap-2">
          Made with{" "}
          <Heart className="w-4 h-4 text-[#FFBC41] animate-pulse" /> by{" "}
          <a
            href="https://www.instagram.com/sore.inspirasi/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#FFBC41] hover:underline hover:text-white transition"
          >
            SoreTeam
          </a>
        </p>

        {/* Copyright */}
        <p className="text-xs text-white/70">
          © {new Date().getFullYear()} Naik Kelas. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
