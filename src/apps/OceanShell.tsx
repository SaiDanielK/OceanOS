"use client";

import { useMemo, useState } from "react";

type Line = {
  type: "input" | "output";
  text: string;
};

export default function OceanShell() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Ocean Shell v1" },
    { type: "output", text: 'Type "help" to see commands.' },
  ]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const name = cmd.toLowerCase();

    const nextLines: Line[] = [...lines, { type: "input", text: `guest@ocean:~$ ${trimmed}` }];

    let output = "";

    switch (name) {
      case "help":
        output = "Commands: help, clear, date, echo, whoami, ls, about";
        break;

      case "clear":
        setLines([]);
        return;

      case "date":
        output = new Date().toString();
        break;

      case "echo":
        output = args.join(" ");
        break;

      case "whoami":
        output = "guest";
        break;

      case "ls":
        output = "about.txt  notes.md  gallery/";
        break;

      case "about":
        output = "Ocean OS shell demo";
        break;

      default:
        output = `command not found: ${cmd}`;
        break;
    }

    setLines([...nextLines, { type: "output", text: output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const terminalHeight = useMemo(() => {
    return Math.max(240, 320);
  }, []);

  return (
    <div className="h-full w-full bg-black p-4 font-mono text-sm text-green-300">
      <div
        className="overflow-auto rounded border border-green-800/40 bg-black/80 p-3"
        style={{ height: terminalHeight }}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={line.type === "input" ? "text-green-400" : "text-white/80"}
          >
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
        <span className="text-green-400">guest@ocean:~$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent text-white outline-none"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
}