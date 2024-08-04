import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div style={{ lineHeight: 1 }} className="font-bold text-[12vw]">
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        <br />
      </div>
      <div className="text-[3vw]">{time.toLocaleDateString()}</div>
    </div>
  );
}

export default Clock;
