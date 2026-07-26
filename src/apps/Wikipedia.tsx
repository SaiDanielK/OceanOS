"use client";

import { useState, useRef } from "react";

export default function Wikipedia() {
  const [inputUrl, setInputUrl] = useState("https://en.wikipedia.org/wiki/Main_Page");
  const [activeUrl, setActiveUrl] = useState("https://en.wikipedia.org/wiki/Main_Page");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSearch = () => {
    const trimmed = inputUrl.trim();
    let url = trimmed;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    if (url.includes("wikipedia")) {
      setActiveUrl(url);
    }
  };

  const handleNavigation = (action: "back" | "forward" | "refresh") => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    try {
      switch (action) {
        case "back":
          iframe.contentWindow.history.back();
          break;
        case "forward":
          iframe.contentWindow.history.forward();
          break;
        case "refresh":
          iframe.contentWindow.location.reload();
          break;
      }
    } catch (error) {
      console.error("Browser navigation failed:", error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-800/50 text-white">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-black/30 p-2 backdrop-blur-sm">
        <button
          onClick={() => handleNavigation("back")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          title="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => handleNavigation("forward")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          title="Forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={() => handleNavigation("refresh")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          title="Refresh"
        >
          ↻
        </button>
        <div className="flex flex-1 items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 shadow-inner shadow-black/20">
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-transparent text-sm text-white/90 outline-none placeholder:text-white/40"
            placeholder="Enter a Wikipedia URL..."
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="mr-1 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          title="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-4.2-4.2" />
          </svg>
        </button>
      </div>

      <iframe ref={iframeRef} src={activeUrl} title="Wikipedia" className="h-full w-full border-0 bg-white" />
    </div>
  );
}