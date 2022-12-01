import moment from "moment";
import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

// sample data (to test out rechart graphing)
const data1 = [{name: 'A', uv: 0}, 
              {name: 'B', uv: 170}, 
              {name: 'C', uv: 300}, 
              {name: 'D', uv: 170}, 
              {name: 'E', uv: 0}, 
              {name: 'F', uv: -170}, 
              {name: 'G', uv: -300}, 
              {name: 'H', uv: -170},
              {name: 'I', uv: 0}];

const data2 = [{name: 'A', uv: 5}, 
              {name: 'B', uv: 170}, 
              {name: 'C', uv: 300}, 
              {name: 'D', uv: 200}, 
              {name: 'E', uv: 150}, 
              {name: 'F', uv: 100}, 
              {name: 'G', uv: 160}, 
              {name: 'H', uv: 10},
              {name: 'I', uv: 50}];

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
      <br />

      <LineChart width={700} height={450} data={data1}>
        <Line type="monotone" dataKey="uv" stroke="#55AAFF" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>

      <br />

      <BarChart width={700} height={450} data={data2}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" barSize={30} fill="#55AAFF" />
      </BarChart>
    </React.Fragment>
  );

};

export default Dashboard;