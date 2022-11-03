import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useElementSize from "./hooks/useElementSize";

function LineChartThree({ chartData }: { chartData: any }) {
  const svgRef = useRef(null);
  const [squareRef, { width, height }] = useElementSize();
  const margin = { top: 30, right: 5, bottom: 65, left: 5 };
  let innerHeight = height ?? 1000;
  let innerWidth = width ?? 800;

  const createGraph = async () => {
    // read data from csv and format variables
    let data = await d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv"
    );
    console.log("data: ", data);
    var parseTime = d3.timeParse("%Y-%m-%d");

    data.forEach((d) => {
      d.date = parseTime(d.date);
      d.value = +d.value;
    });

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 };
    // append the svg object to the body of the component
    var svg = d3
      .select(svgRef.current)
      .append("g")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add X axis and Y axis
    var x = d3.scaleTime().range([0, innerWidth]);
    var y = d3.scaleLinear().range([innerHeight, 0]);

    x.domain(
      d3.extent(data, (d) => {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(data, (d) => {
        return d.value;
      }),
    ]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // add the Line
    var valueLine = d3
      .line()
      .x((d) => {
        return x(d.date);
      })
      .y((d) => {
        return y(d.value);
      });

    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
  };

  useEffect(() => {
    createGraph();
  }, [svgRef.current, chartData]);

  if (innerHeight <= 0 || innerWidth <= 0) {
    innerHeight = 800;
    innerWidth = 400;
  }
  return (
    <>
      <div
        className="w-full h-full bg-zinc-600 flex items-center justify-center"
        ref={squareRef}
      >
        <svg ref={svgRef} width={innerWidth} height={innerHeight}></svg>
      </div>
    </>
  );
}
export default LineChartThree;
