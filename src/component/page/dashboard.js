import React, { useEffect, useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from "react-vis";
import {curveCatmullRom} from "d3-shape";
import { getVoltage } from "../../service/cubesatAPIService";
import _ from "lodash";

const Dashboard = () => {
  const [voltage, setVoltage] = useState([]);
  const [voltageSize, setVoltageSize] = useState(0);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchVoltage = async () => {
      const voltageStat = _.get(await getVoltage(), "voltage", undefined);
      if (voltageStat === undefined) {
        return;
      }

      setVoltage(voltageStat);
      setVoltageSize(voltageSize + 1);
      setGraphData([...graphData, {x: voltageSize + 1, y: voltageStat}]);
    };
    const refresh = setInterval(() => fetchVoltage(), 1000);

    return () => {
      clearInterval(refresh);
    };
  }, [voltage, voltageSize, graphData]);

  return (
    <React.Fragment>
      <XYPlot width={800} height={600} style={{ fill: "none" }}>
        <HorizontalGridLines style={{stroke: "#B7E9ED", strokeWidth: 0.5}} />
        <VerticalGridLines style={{stroke: "#B7E9ED", strokeWidth: 0.5}} />
        <XAxis
          title="X Axis"
          style={{
            line: {stroke: "#ADDDE1"},
            ticks: {stroke: "#ADDDE1"},
            text: {stroke: "none", fill: "#6b6b76", fontWeight: 600}
          }}
        />
        <YAxis
          title="Y Axis"
          style={{
            line: {stroke: "#ADDDE1"},
            ticks: {stroke: "#ADDDE1"},
            text: {stroke: "none", fill: "#6b6b76", fontWeight: 600}
          }}
        />
        <ChartLabel
          text="Time"
          className="alt-x-label"
          includeMargin={false}
          xPercent={0.025}
          yPercent={1.01}
        />

        <ChartLabel
          text="Voltage"
          className="alt-y-label"
          includeMargin={false}
          xPercent={0.06}
          yPercent={0.06}
          style={{
            transform: "rotate(-90)",
            textAnchor: "end"
          }}
        />
        <LineSeries
          className="voltage"
          data={graphData}
          curve={curveCatmullRom.alpha(0.2)}
          color="black"
          strokeWidth={4}
        />
      </XYPlot>
    </React.Fragment>
  );
};

export default Dashboard;
