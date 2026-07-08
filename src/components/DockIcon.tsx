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
    <div id={dockId} className="flex flex-col items-center">
      <button
        onClick={handleClick}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className={bouncing ? "dock-bounce" : ""}
      >
        <img
          src={icon}
          alt="Dock Icon"
          style={{ width: size, height: size }}
          className="transition-all duration-150"
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