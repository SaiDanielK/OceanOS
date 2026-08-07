"use client";

import { useState } from "react";

type DockIconProps = {
  icon: string;
  onClick: () => void;
  isOpen: boolean;
  dockId: string;
  size: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export default function DockIcon({
  icon,
  onClick,
  isOpen,
  dockId,
  size,
  onHoverStart,
  onHoverEnd,
}: DockIconProps) {
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    onClick();

    setTimeout(() => {
      setBouncing(false);
    }, 450);
  };

  return (
    <div id={dockId} className="flex flex-col items-center" style={{ viewTransitionName: dockId }}>
      <button
        onClick={handleClick}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className={`rounded-2xl bg-transparent p-0 ${bouncing ? "dock-bounce" : ""}`}
      >
        <img
          src={icon}
          alt="Dock Icon"
          style={{ width: size, height: size, objectFit: "contain" }}
          className="transition-all duration-200 ease-out drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
        />
      </button>

      <div
        className={`
          w-1.5 h-1.5 rounded-full bg-white mt-1
          transition-opacity duration-200
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
}