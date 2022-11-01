import React from "react";
import { ChartFilter } from "../../types/enums";
import SmallCard from "./SmallCard";

// Get index of Chart Filter enum to correctly set value for global filter state
export const getIndexOfFilter = (filter: ChartFilter) => {
  return Object.values(ChartFilter).indexOf(filter);
};

function AnalogProcessingPanel({
  currentFilter,
  action,
}: {
  currentFilter: ChartFilter;
  action: Function;
}) {
  return (
    <div className="flex flex-col">
      <div className="w-full h-6 text-sm font-bold uppercase flex items-center">
        Analytics
      </div>
      <div className="flex flex-row py-2 w-full flex-wrap">
        {Object.values(ChartFilter).map((filter) => {
          return (
            <div
              key={filter}
              onClick={() => {
                console.log("setting filter analogprocessingpanel: ", filter);
                action(filter);
              }}
            >
              <SmallCard
                classes={`${
                  currentFilter == filter
                    ? "border-cyan-400"
                    : "border-transparent"
                } border border-solid mr-1 w-min mb-1 capitalize`}
              >
                {Object.keys(ChartFilter)[getIndexOfFilter(filter)]}
              </SmallCard>
            </div>
          );
        })}
      </div>
      <div>
        <div className="w-full h-6 text-sm font-bold uppercase flex items-center">
          Chunk Input
        </div>
        <div className="flex flex-row py-2 w-full">
          <div className="flex flex-col mr-1">
            <label htmlFor="chunkLower">Lower Limit</label>
            <input
              className="w-full bg-zinc-800"
              autoComplete="on"
              type="number"
              name="chunkLower"
              placeholder={"0"}
              onChange={(e) =>
                console.log("lower chunk filter: ", e.target.value)
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="chunkUpper">Upper Limit</label>
            <input
              className="w-full bg-zinc-800"
              autoComplete="on"
              type="number"
              name="chunkUpper"
              placeholder={"10"}
              onChange={(e) =>
                console.log("upper chunk filter: ", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalogProcessingPanel;
