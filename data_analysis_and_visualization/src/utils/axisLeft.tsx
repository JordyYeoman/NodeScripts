export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }: any) =>
  yScale.ticks().map((tickValue: any, index: number) => (
    <g
      key={index}
      className="tick"
      transform={`translate(0,${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        x={-tickOffset}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
