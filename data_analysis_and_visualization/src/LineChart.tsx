import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { csv, scaleLinear, scaleTime, max, timeFormat, extent } from "d3";
import { useData } from "./hooks/useData";
import { AxisBottom } from "./utils/axisBottom";
import { AxisLeft } from "./utils/axisLeft";
import { Marks } from "./utils/marks";
import useElementSize from "./hooks/useElementSize";
import { DataLayer } from "./App";

const margin = { top: 30, right: 5, bottom: 65, left: 45 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = -5;

const LineChart = ({ data }: { data: any }) => {
  const [squareRef, { width, height }] = useElementSize();
  // const data = useData();
  if (!data || data.data.length < 1) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = (height ?? 0) - margin.top - margin.bottom;
  const innerWidth = (width ?? 0) - margin.left - margin.right;
  const xValue = (d: DataLayer) => d.labels;
  const xAxisLabel = "Time";
  const yValue = (d: DataLayer) => d.data;
  const yAxisLabel = "Data";
  const xAxisTickFormat = timeFormat("%a");

  const xScale = scaleTime()
    // .domain(extent(data as Iterable<T>, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    // .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <div
      className="w-full h-full bg-zinc-600 flex items-center justify-center"
      ref={squareRef}
    >
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={7}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={3}
          />
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
