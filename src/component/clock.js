import { useState, useEffect } from "react";
import React from "react";
import moment from "moment";

const Clock = () => {
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
    <div className="clock">
      <div className="screen">
        <h3 className="time">{time}</h3>
      </div>
    </div>
  );
};

export default Clock;
