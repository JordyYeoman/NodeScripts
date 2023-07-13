import { useRef, useEffect } from "react";
import { setupCanvas } from "./simulation/Setup";

const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setupCanvas(canvasRef);
  }, [props]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
