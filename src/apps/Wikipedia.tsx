"use client";

import { useState } from "react";

export default function Wikipedia() {
  const [inputUrl, setInputUrl] = useState("https://en.wikipedia.org/wiki/Main_Page");
  const [activeUrl, setActiveUrl] = useState("https://en.wikipedia.org/wiki/Main_Page");

  const handleSearch = () => {
    const trimmed = inputUrl.trim();
    if (trimmed.includes("wikipedia")) {
      setActiveUrl(trimmed);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-black">
      <div className="flex items-center gap-2 border-b border-gray-700 bg-black p-2">
        <div className="flex flex-1 items-center rounded-md border border-gray-600 bg-black px-3 py-2">
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-black text-sm text-white outline-none"
          />
        </div>
        <button type="button" onClick={handleSearch} onMouseEnter={(e) => e.currentTarget.classList.add("bg-gray-600")} onMouseLeave={(e) => e.currentTarget.classList.remove("bg-gray-600")} className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-4.2-4.2" />
          </svg>
        </button>
      </div>

      <iframe src={activeUrl} title="Wikipedia" className="h-full w-full border-0" />
    </div>
  );
}