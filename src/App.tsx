import { CssBaseline } from "@mui/material";
import React from "react";
import NavigationTab from "./component/tab/navigationTab";

const App: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationTab />
    </React.Fragment>
  );
};

export default App;
