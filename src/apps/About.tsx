export default function About() {
  return (
    <div className="h-full w-full bg-black/70 p-8 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wider">OceanOS 🌊</h1>
        <p className="mt-2 text-lg text-white/70">
          A modern desktop experience, reimagined for the web.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-3">Core Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-white/10">
              <span className="text-2xl">⚡️</span>
              <p className="text-sm mt-1">Next.js</p>
            </div>
            <div className="p-3 rounded-lg bg-white/10">
              <span className="text-2xl">⚛️</span>
              <p className="text-sm mt-1">React</p>
            </div>
            <div className="p-3 rounded-lg bg-white/10">
              <span className="text-2xl">🐻</span>
              <p className="text-sm mt-1">Zustand</p>
            </div>
            <div className="p-3 rounded-lg bg-white/10">
              <span className="text-2xl">💨</span>
              <p className="text-sm mt-1">Tailwind CSS</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-2">Project Philosophy</h2>
          <p className="text-white/80 leading-relaxed">
            The goal of OceanOS is to create a beautiful and performant desktop environment with a calm, ocean-inspired aesthetic. It serves as a personal endeavor to explore the full capabilities of modern web technologies while providing a relaxing and nostalgic user experience.
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/70 mb-4">
            Feedback and contributions are always welcome!
          </p>
          <a
            href="https://github.com/SaiDanielK/OceanOS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-cyan-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}