import { line, curveNatural } from "d3";
export const Marks = (
  { data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }: any // Todo: fix typing
) => {
  // console.log("marks: ", data);
  let xLabels = [...Array(1000).keys()].map((k) => k);
  return (
    <g className="marks">
      <path
        fill="none"
        stroke="black"
        // @ts-ignore
        d={line()
          .x((d) => {
            console.log("marks: ", xScale(xValue(d)));
            return xScale(xValue(d));
          })
          .y((d) => yScale(yValue(d)))
          .curve(curveNatural)(data)}
      />
      {/* {xLabels.map((d: any, index: number) => (
        <circle
          key={index}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        >
          <title>{tooltipFormat(xValue(d))}</title>
        </circle>
      ))} */}
    </g>
  );
};
