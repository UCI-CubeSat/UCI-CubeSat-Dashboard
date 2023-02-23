import logoImgFile from "@/assets/cubesat.png";
import React from "react";

type Props = {
  style: React.CSSProperties
}
const Logo = (props: Props) => (

  <img src={logoImgFile} alt="Logo" style={props.style} />
);

export default Logo;
