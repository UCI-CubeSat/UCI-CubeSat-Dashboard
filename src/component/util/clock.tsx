import moment from "moment";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

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
    <Typography>
      <h4 align="center">
      Internal Dashboard
           <h1 className="time" align="center">
                {time}
            </h1>
      </h4>
      </Typography>
    </React.Fragment>
  );
};

export default Clock;
