export default function About() {
  return (
    <div className="h-full w-full bg-black/70 p-6 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <h1 className="text-2xl font-semibold">Ocean OS 🌊</h1>

      <p className="mt-3 text-white/70">
        Ocean OS is a playful desktop-style experience built with Next.js and React.
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="font-semibold">Version</h2>
          <p className="mt-1 text-sm text-white/70">
            1.0.0 With New Features: Added a new ocean-themed background and improved the overall user interface for a more immersive experience.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="font-semibold">Resources</h2>
          <p className="mt-1 text-sm text-white/70">
            Next.js, React, Zustand, and Tailwind CSS.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-4">
          <h2 className="font-semibold">Goal for this Project</h2>
          <p className="mt-1 text-sm text-white/70">
            To create a retro desktop environment with a calm ocean aesthetic.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-4">
          <h2 className="font-semibold">Notes from the Developer</h2>
          <p className="mt-1 text-sm text-white/70">
            This project is a personal endeavor to explore the capabilities of modern web technologies while providing a relaxing and nostalgic user experience. Feedback and contributions are welcome!
          </p>
        </div>        
      </div>
    </div>
  );
}