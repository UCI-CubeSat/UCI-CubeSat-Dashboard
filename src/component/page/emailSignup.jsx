import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel} from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";


const EmailSignup = (props) => {
  EmailSignup.propTypes = {

  };

  return (
    <div className="SignUp"
      style={{display: "flex", justifyContent: "center",
        alignItems: "center", height: "50vh"}}>
      <FormControl sx={{ width: "80%"}}>
        <InputLabel htmlFor="my-input"
          style= {{ color: "white" }}>
          Email Address
        </InputLabel>
        <OutlinedInput id="my-input"
          aria-describedby="my-helper-text"
          style= {{ color: "white" }}/>
        <FormHelperText id="my-helper-text" style= {{ color: "white" }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          We'll never share your email.
        </FormHelperText>
      </FormControl>
    </div>
  );
};
export default EmailSignup;
