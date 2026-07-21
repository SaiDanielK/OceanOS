"use client";

import { useState } from "react";

const buttons = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="]
];

const isOperator = (value: string) => ["+", "-", "×", "÷"].includes(value);

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [lastPressed, setLastPressed] = useState("");

  const sanitizeExpression = (value: string) =>
    value.replace(/×/g, "*").replace(/÷/g, "/");

  const evaluate = (expression: string) => {
    try {
      const sanitized = sanitizeExpression(expression);
      const result = new Function(`return ${sanitized}`)();
      return String(result ?? "0");
    } catch {
      return "0";
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setLastPressed("");
  };

  const handleToggleSign = () => {
    if (display === "0") return;
    if (display.startsWith("-")) {
      setDisplay(display.slice(1));
    } else {
      setDisplay(`-${display}`);
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    if (Number.isNaN(value)) return;
    setDisplay(String(value / 100));
  };

  const handleOperator = (nextValue: string) => {
    if (isOperator(lastPressed) && nextValue !== "-") {
      setDisplay((prev) => prev.slice(0, -1) + nextValue);
      setLastPressed(nextValue);
      return;
    }

    if (lastPressed === "=") {
      setLastPressed(nextValue);
      setDisplay(display + nextValue);
      return;
    }

    setDisplay((prev) =>
      prev === "0" ? nextValue : prev + nextValue
    );
    setLastPressed(nextValue);
  };

  const handleNumber = (value: string) => {
    if (lastPressed === "=") {
      setDisplay(value);
      setLastPressed(value);
      return;
    }

    if (display === "0" && value === "0") return;

    if (display === "0" && value !== ".") {
      setDisplay(value);
    } else {
      setDisplay((prev) => prev + value);
    }
    setLastPressed(value);
  };

  const handleDecimal = () => {
    const parts = display.split(/\+|\-|×|÷/);
    const current = parts[parts.length - 1];

    if (current.includes(".")) return;

    setDisplay((prev) => prev + ".");
    setLastPressed(".");
  };

  const handleEquals = () => {
    const result = evaluate(display);
    setDisplay(result);
    setLastPressed("=");
  };

  const handleButton = (value: string) => {
    switch (value) {
      case "AC":
        handleClear();
        break;
      case "+/-":
        handleToggleSign();
        break;
      case "%":
        handlePercent();
        break;
      case "=":
        handleEquals();
        break;
      case ".":
        handleDecimal();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        handleOperator(value);
        break;
      default:
        handleNumber(value);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] rounded-[32px] bg-black/40 border border-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl text-white">
        <div className="rounded-3xl bg-white/5 p-4 mb-3">
          <div className="min-h-[60px] flex items-end justify-end text-right text-4xl font-semibold leading-[1.05] text-white">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((button, index) => {
            const isZero = button === "0";
            const isEqual = button === "=";
            const isOperatorButton = ["÷", "×", "-", "+"].includes(button);
            const isControl = ["AC", "+/-", "%"].includes(button);

            return (
              <button
                key={`${button}-${index}`}
                onClick={() => handleButton(button)}
                className={
                  `rounded-3xl py-5 text-lg font-medium transition-colors duration-200 ` +
                  (isEqual
                    ? "col-span-1 bg-cyan-400 text-black shadow-[0_20px_40px_rgba(22,214,255,0.25)] hover:bg-cyan-300"
                    : isOperatorButton
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : isControl
                    ? "bg-white/5 text-white/80 hover:bg-white/10"
                    : "bg-white/5 text-white hover:bg-white/10")
                }
                style={isZero ? { gridColumn: "span 2" } : undefined}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}