import React from "react";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

const EmailSignup = (props) => {
  EmailSignup.propTypes = {

  };

  return (
    <div className="SignUp">
      <FormControl>
        <InputLabel htmlFor="my-input">Email Address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          We'll never share your email.
        </FormHelperText>
      </FormControl>
    </div>
  );
};
export default EmailSignup;
