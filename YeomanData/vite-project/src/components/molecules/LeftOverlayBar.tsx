import React, { useEffect, useState } from "react";

function LeftOverlayBar() {
  const date = new Date();
  const LeftSideElements = [
    "SYSTEMS ONLINE",
    date.toLocaleTimeString(),
    "STAND BY",
    date.toLocaleDateString(),
  ];
  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 1e3);
    // Cleanup the set timeout method
    return () => clearTimeout(timer);
  }, [count, ticking]);

  return (
    <div className="absolute h-full w-10 flex flex-col justify-around items-center -left-[28px]">
      {LeftSideElements.map((el, index) => {
        return (
          <div
            key={index}
            className="font-dogica-pixel-bold -rotate-90 text-[6px] w-[100px] tracking-normal transition duration-300 hover:tracking-widest"
          >
            {el}
          </div>
        );
      })}
    </div>
  );
}

export default LeftOverlayBar;
