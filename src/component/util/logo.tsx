import React from "react";
import logoImgFile from "../../resource/cubesat.png";

const Logo: React.FC<{}> = () => (
  <img src={logoImgFile} alt="Logo" height={"130px"} width={"130px"} />
);

export default Logo;
