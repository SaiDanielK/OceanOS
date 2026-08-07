"use client";

import { Rnd, type Position } from "react-rnd";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type WindowProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
  title: string;
  dockId: string;
  zIndex: number;
  width?: number;
  height?: number;
  windowId?: string;
  onFocus: () => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
};

export default function Window({
  children,
  isOpen,
  onClose,
  onMinimize,
  isMinimized,
  title,
  dockId,
  zIndex,
  width,
  height,
  windowId,
  onFocus,
  position,
  onPositionChange,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  const [maximized, setMaximized] = useState(false);

  const baseOffset = Math.max(0, zIndex - 100) * 50;

  const [bounds, setBounds] = useState({
    x: position.x,
    y: position.y,
    width: width ?? 500,
    height: height ?? 400,
  });

  const [previousBounds, setPreviousBounds] = useState({
    x: position.x,
    y: position.y,
    width: width ?? 500,
    height: height ?? 400,
  });

  useEffect(() => {
    setBounds(b => ({ ...b, x: position.x, y: position.y }));
  }, [position.x, position.y]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;
    const windowEl = windowRef.current;
    if (!windowEl) return;

    if (!hasAnimatedIn) {
      windowEl.animate(
        [
          { transform: "scale(0.95)", opacity: 0, filter: "blur(6px)" },
          { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
        ],
        {
          duration: 260,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );
      setHasAnimatedIn(true);
    }
  }, [isOpen, isMinimized, hasAnimatedIn]);

  if (!isOpen || isMinimized) return null;

  const handleMinimize = () => {
    const windowEl = windowRef.current;
    const dockEl = document.getElementById(dockId);

    if (!windowEl || !dockEl) {
      onMinimize();
      return;
    }

    const windowRect = windowEl.getBoundingClientRect();
    const dockRect = dockEl.getBoundingClientRect();

    const deltaX =
      dockRect.left +
      dockRect.width / 2 -
      (windowRect.left + windowRect.width / 2);

    const deltaY =
      dockRect.top +
      dockRect.height / 2 -
      (windowRect.top + windowRect.height / 2);

    windowEl.animate(
      [
        {
          transform: "translate(0px, 0px) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0.15)`,
          opacity: 0,
        },
      ],
      {
        duration: 550,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );

    setTimeout(() => {
      onMinimize();
    }, 550);
  };

  const handleMaximize = () => {
    if (!maximized) {
      setPreviousBounds(bounds);

      setBounds({
        x: 0,
        y: 40,
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setMaximized(true);
    } else {
      setBounds(previousBounds);
      setMaximized(false);
    }
  };

  return (
    <Rnd
      className="pointer-events-auto"
      style={{ zIndex, pointerEvents: "auto" }}
      size={{
        width: bounds.width,
        height: bounds.height,
      }}
      position={{
        x: bounds.x,
        y: bounds.y,
      }}
      bounds="window"
      dragHandleClassName="window-header"
      disableDragging={maximized}
      onDrag={(_e, d) => {
        onPositionChange({ x: d.x, y: d.y });
      }}
      enableResizing={!maximized}
      onMouseDown={onFocus}
      onDragStop={(_e, d) => {
        onPositionChange({ x: d.x, y: d.y });
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setBounds({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        });
        onPositionChange(position);
      }}
    >
      <div
        id={windowId}
        ref={windowRef}
        className="
          w-full
          h-full
          flex
          flex-col
          bg-black/30
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          overflow-hidden
          text-white
        "
      >
        <div
          className="
            window-header
            cursor-grab
            active:cursor-grabbing
            h-12
            shrink-0
            border-b
            border-white/10
            flex
            items-center
            px-4
            relative
          "
        >
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500"
            />

            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500"
            />

            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500"
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-sm text-white/70">
            {title}
          </div>
        </div>

        <div id={`${windowId}-content`} className="h-[calc(100%-48px)] overflow-hidden">
          {children}
        </div>
      </div>
    </Rnd>
  );
}