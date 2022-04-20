import React from "react";
import NavigationTab from "./component/tab/navigationTab";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <NavigationTab />
        </header>
      </div>
    </React.Fragment>
  );
};

export default App;
