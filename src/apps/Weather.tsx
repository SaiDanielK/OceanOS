"use client";

import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState({
    temp: "--",
    condition: "Loading...",
    icon: "☁️",
    location: "Detecting...",
    humidity: "--",
    wind: "--",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        );

        const data = await response.json();

        const code = data.current.weather_code;

        const conditions: Record<number, {name:string; icon:string}> = {
          0: {
            name:"Clear",
            icon:"☀️"
          },
          1:{
            name:"Mostly clear",
            icon:"🌤️"
          },
          2:{
            name:"Cloudy",
            icon:"⛅"
          },
          3:{
            name:"Cloudy",
            icon:"☁️"
          },
          61:{
            name:"Rain",
            icon:"🌧️"
          },
          95:{
            name:"Storm",
            icon:"⛈️"
          }
        };


        const condition =
          conditions[code] ?? {
            name:"Unknown",
            icon:"🌎"
          };


        setWeather({
          temp:
            `${Math.round(
              data.current.temperature_2m * 9 / 5 + 32
            )}°F`,

          condition: condition.name,
          icon: condition.icon,

          location:"Current location",

          humidity:
            `${data.current.relative_humidity_2m}%`,

          wind:
            `${Math.round(
              data.current.wind_speed_10m * 0.621
            )} mph`
        });

      }
    );
  },[]);


  return (
    <div className="
      h-full
      p-6
      text-white
      bg-gradient-to-b
      from-blue-500/30
      to-cyan-900/40
    ">

      <div className="text-center">

        <div className="text-7xl">
          {weather.icon}
        </div>

        <div className="mt-4 text-5xl font-bold">
          {weather.temp}
        </div>

        <div className="text-xl text-white/70">
          {weather.condition}
        </div>

        <div className="mt-2 text-sm text-white/50">
          {weather.location}
        </div>

      </div>


      <div className="
        mt-8
        grid
        grid-cols-2
        gap-4
      ">

        <div className="
          rounded-2xl
          bg-white/10
          p-4
        ">
          <div className="text-xs text-white/50">
            HUMIDITY
          </div>

          <div className="text-xl">
            {weather.humidity}
          </div>
        </div>


        <div className="
          rounded-2xl
          bg-white/10
          p-4
        ">
          <div className="text-xs text-white/50">
            WIND
          </div>

          <div className="text-xl">
            {weather.wind}
          </div>
        </div>

      </div>

    </div>
  );
}