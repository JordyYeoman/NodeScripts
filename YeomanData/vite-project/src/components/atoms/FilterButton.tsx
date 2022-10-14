import React from "react";

function FilterButton({
  text,
  category,
  action,
}: {
  text: string;
  category: string;
  action: Function;
}) {
  return (
    <div
      className={`bg-zinc-700 bg-opacity-80 py-0 ${
        text ? "px-1 ml-2" : ""
      } rounded transition text-center text-[10px] duration-200 hover:bg-zinc-800 cursor-pointer`}
      onClick={() => {
        action(category);
      }}
    >
      {text}
    </div>
  );
}

export default FilterButton;
