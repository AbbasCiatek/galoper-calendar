import { useEffect, useState } from "react";

export function TimeLine() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);
  const getCurrentPositionTime = () => {
    const minutesInDay = 24 * 60;
    const minute = currentTime.getHours() * 60 + currentTime.getMinutes();
    return (minute / minutesInDay) * 100;
  };

  return (
    <div className="group">
      <div
        className="pointer-events-none absolute inset-x-0 z-50 border-t border-black "
        style={{ top: `${getCurrentPositionTime()}%` }}
      >
        <div className=" absolute -left-2 -top-1.5 size-3  rounded-full bg-black " />
      </div>
    </div>
  );
}
