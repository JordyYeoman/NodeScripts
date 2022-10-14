import { useEffect, useState } from "react";

export default function Coordinates() {
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = (event: { screenX: any; screenY: any }) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <div>
      <h2 className="font-dogica-pixel text-[8px]">
        {globalCoords.x} N&deg; {globalCoords.y} W&deg;
      </h2>
    </div>
  );
}
