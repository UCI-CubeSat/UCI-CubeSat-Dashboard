import React from "react";
import logoImgFile from "../../resource/cubesat.png";

const Logo = () => {
  return (
    <React.Fragment>
      <img src={logoImgFile} alt="Logo" height={"130px"} width={"130px"} />
    </React.Fragment>
  );
};

export default Logo;
