"use client";

import { useDesktopStore } from "@/store/desktopStore";
import { useEffect, useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";

type GuideStep = {
  selector: string;
  title: string;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  action?: () => void;
};

type GuideProps = {
  desktopMode?: "macos" | "windows";
};

const steps: GuideStep[] = [
  {
    selector: "#search-bar",
    title: "Universal Search",
    content: "Quickly find and launch any app from here. Try typing 'notes' and pressing Enter!",
    position: "bottom",
  },
  {
    selector: "#widgets-container",
    title: "Draggable Widgets",
    content: "You can view our widgets on the top right corner of the screen. You can click and drag them anywhere on your desktop.",
    position: "left",
  },
  {
    selector: "#desktop-grid",
    title: "Desktop Icons",
    content: "Your apps now sit in a Windows-style grid. Click an icon to open an app.",
    position: "top",
  },
  {
    selector: "#settings-desktop-icon",
    title: "Settings App",
    content: "Let's check out the settings. I'll open it for you.",
    position: "top",
    action: () => useDesktopStore.getState().openApp("settings"),
  },
  {
    selector: "#theme-selector",
    title: "Personalize Your Theme",
    content: "You can change the entire OS theme here. Try picking one!",
    position: "bottom",
  },
  {
    selector: "#wallpaper-selector",
    title: "Choose a Wallpaper",
    content: "Select a new wallpaper to match your mood.",
    position: "top",
    action: () => {
      const settingsContent = document.querySelector("#settings-window-content");
      const systemToggles = document.querySelector("#system-toggles");
      if (settingsContent && systemToggles) {
        systemToggles.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
  },
  {
    selector: "#system-toggles",
    title: "System Controls",
    content: "You can toggle sound effects and other system settings here.",
    position: "top",
  },
  {
    selector: "#system-toggles",
    title: "All Done!",
    content: "That's a quick look at OceanOS. Feel free to explore and customize it to your liking!",
    position: "bottom",
    action: () => useDesktopStore.getState().closeApp("settings"),
  },
];

export default function Guide({ desktopMode = "windows" }: GuideProps) {
  const [stepIndex, setStepIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const getDefaultPosition = () => ({
    x: window.innerWidth - 100,
    y: desktopMode === "macos" ? window.innerHeight - 140 : window.innerHeight - 100,
  });

  const [position, setPosition] = useState(getDefaultPosition);
  const [dragState, setDragState] = useState<{
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  const currentStep = useMemo(() => (stepIndex >= 0 ? steps[stepIndex] : null), [stepIndex]);

  useEffect(() => {
    if (!currentStep) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const element = document.querySelector(currentStep.selector);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    currentStep.action?.();

    const timer = setTimeout(updateRect, 300);
    window.addEventListener("resize", updateRect);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateRect);
    };
  }, [currentStep]);

  useEffect(() => {
    setPosition(getDefaultPosition());
  }, [desktopMode]);

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (event: PointerEvent) => {
      const nextX = Math.min(
        window.innerWidth - 100,
        Math.max(0, dragState.startLeft + (event.clientX - dragState.startX))
      );
      const nextY = Math.min(
        window.innerHeight - 100,
        Math.max(0, dragState.startTop + (event.clientY - dragState.startY))
      );
      setPosition({ x: nextX, y: nextY });
    };

    const handlePointerUp = () => setDragState(null);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragState({
      startX: event.clientX,
      startY: event.clientY,
      startLeft: position.x,
      startTop: position.y,
    });
  };

  useEffect(() => {
    if (!isMinimized) return;

    const handleResize = () => {
      setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMinimized]);

  const startTour = () => {
    setIsMinimized(false);
    setStepIndex(0);
  };

  if (hasStarted && isMinimized) {
    return (
      <button
        onClick={startTour}
        onPointerDown={handlePointerDown}
        className="fixed z-[999] h-16 w-16 cursor-grab rounded-full border-2 border-white/20 bg-slate-900/80 text-2xl shadow-2xl backdrop-blur-lg active:cursor-grabbing"
        style={{ left: position.x, top: Math.min(position.y, window.innerHeight - 120 - 25) }}
        title="Start Tour"
      >
        ❓
      </button>
    );
  }

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center text-white shadow-2xl backdrop-blur-lg">
          <h2 className="text-2xl font-bold">Welcome to OceanOS!</h2>
          <p className="mt-2 text-white/70">Would you like a quick tour of the features?</p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => {
                setHasStarted(true);
                setIsMinimized(true);
                setPosition(getDefaultPosition());
              }}
              className="flex-1 rounded-xl bg-white/10 py-2 transition hover:bg-white/20"
            >
              No, thanks
            </button>
            <button
              onClick={() => {
                setHasStarted(true);
                startTour();
              }}
              className="flex-1 rounded-xl bg-cyan-500 py-2 font-semibold transition hover:bg-cyan-400"
            >
              Yes, please!
            </button>
          </div>
        </div>
      </div>
    );
  }

  const guideStyle: React.CSSProperties = {};
  if (targetRect) {
    const positionMap = {
      bottom: { top: targetRect.bottom + 16, left: targetRect.left + targetRect.width / 2 - 150 },
      top: { top: targetRect.top - 160, left: targetRect.left + targetRect.width / 2 - 150 },
      left: { top: targetRect.top + targetRect.height / 2 - 75, left: targetRect.left - 316 },
      right: { top: targetRect.top + targetRect.height / 2 - 75, left: targetRect.right + 16 },
    };
    const pos = positionMap[currentStep?.position ?? "bottom"];
    guideStyle.top = `${Math.max(10, Math.min(pos.top, window.innerHeight - 170))}px`;
    guideStyle.left = `${Math.max(10, Math.min(pos.left, window.innerWidth - 310))}px`;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[998]">
      {currentStep && (
        <button
          onClick={() => {
            setStepIndex(-1);
            setIsMinimized(true);
            setPosition(getDefaultPosition());
          }}
          className="pointer-events-auto fixed top-12 right-4 z-[1000] flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 text-sm text-white shadow-lg backdrop-blur-lg transition hover:bg-white/20"
          title="End Tour"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          <span>End Tour</span>
        </button>
      )}

      {targetRect && (
        <div
          className="absolute rounded-2xl border-2 border-dashed border-cyan-400 bg-cyan-400/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] transition-all duration-500"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        />
      )}

      {currentStep && (
        <div
          className="pointer-events-auto absolute w-72 rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-white shadow-2xl backdrop-blur-lg transition-all duration-500"
          style={guideStyle}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">{currentStep.title}</h3>
            <span className="text-xs font-medium text-white/50">
              {stepIndex + 1} / {steps.length}
            </span>
          </div>
          <p className="text-sm text-white/80">{currentStep.content}</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={stepIndex === 0}
              className="rounded-lg bg-white/10 px-3 py-1 text-sm transition hover:bg-white/20 disabled:opacity-50"
            >
              Prev
            </button>
            {stepIndex < steps.length - 1 ? (
              <button
                onClick={() => setStepIndex((prev) => prev + 1)}
                className="rounded-lg bg-cyan-500 px-3 py-1 text-sm font-semibold transition hover:bg-cyan-400"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  setStepIndex(-1);
                  setIsMinimized(true);
                  setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
                }}
                className="rounded-lg bg-cyan-500 px-3 py-1 text-sm font-semibold transition hover:bg-cyan-400"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}