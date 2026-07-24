"use client";

import { useState, useMemo } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const calendarDays = useMemo(() => {
    const days = [];
    const firstDay = firstDayOfMonth(currentDate);
    const totalDays = daysInMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  }, [currentDate]);

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const today = new Date();
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="h-full w-full bg-black/70 p-6 text-white flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            ← Previous
          </button>
          <h1 className="text-2xl font-semibold">
            {monthName} {year}
          </h1>
          <button
            onClick={nextMonth}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            Next →
          </button>
        </div>
        {!isCurrentMonth && (
          <button
            onClick={goToToday}
            className="w-full px-3 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-300"
          >
            Go to Today
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col">

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-white/60 py-2 text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 flex-1">
          {calendarDays.map((day, index) => {
            const isSelected = selectedDay === day && day !== null;

            return (
              <div
                key={index}
                onClick={() => day !== null && setSelectedDay(day)}
                className={`
                  flex items-center justify-center rounded-lg text-sm font-medium
                  transition-colors cursor-pointer
                  ${
                    day === null
                      ? "bg-transparent"
                      : isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white/70"
                  }
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-sm text-white/50">
        <p>
          {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay).toLocaleDateString("default", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}
