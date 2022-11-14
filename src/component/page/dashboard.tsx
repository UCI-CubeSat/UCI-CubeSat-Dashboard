import moment from "moment";
import React, { useEffect, useState } from "react";
import { LineChart, Line } from 'recharts';
import { CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'A', uv: 100, pv: 2400, amt: 2400}, {name: 'B', uv: 200, pv: 2400, amt: 2400}, {name: 'C', uv: 300, pv: 2400, amt: 2400}, {name: 'D', uv: 200, pv: 2400, amt: 2400}, {name: 'E', uv: 100, pv: 2400, amt: 2400}];

const Dashboard: React.FC<{}> = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const timeStamp = moment().format("MMMM Do YYYY, h:mm:ss a");

      setTime(timeStamp);
    };
    const timerRefresh = setInterval(() => tick(), 500);

    return function cleanup() {
      clearInterval(timerRefresh);
    };
  });

  return (
    <React.Fragment>
      <p className="time">
        {time}
      </p>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </React.Fragment>
  );

};

export default Dashboard;