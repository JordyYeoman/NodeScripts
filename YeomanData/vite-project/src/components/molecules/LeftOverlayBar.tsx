import React from "react";

const LeftSideElements = ["13th Oct", "STAND BY", "", "", "SYSTEMS ONLINE"];

function LeftOverlayBar() {
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
