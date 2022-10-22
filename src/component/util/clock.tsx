import moment from "moment";
import React, { useEffect, useState } from "react";

const Clock: React.FC<{}> = () => {
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
    </React.Fragment>
  );
};

export default Clock;
