/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Time from "./clock";
import Logo from "./logo";
import Prediction from "./prediction";
import EmailSignup from "./emailSignup";
import MapView from "./mapView";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TAB_CONFIG } from "../util/config";

const TabPanel = (props) => {
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div
      role="tabPanel"
      hidden={props.value !== props.index}
      id={`navigation-tabPanel-${props.index}`}
      aria-labelledby={`tab-${props.index}`}
    >
      {props.value === props.index && (
        <Box sx={{ p: 3 }}>
          <Typography>{props.children}</Typography>
        </Box>
      )}
    </div>
  );
};

const NavigationTab = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  let currentTabName = TAB_CONFIG[0].name;

  const NavigationContext = React.createContext({
    tabIndex: currentTabIndex,
    tabName: currentTabName,
  });

  /* TODO store currentTabName in a useRef hook
  Warning:(56, 22) ESLint: Assignments to the 'currentTabName' variable from
  inside React Hook useEffect will be lost after each render.
  To preserve the value over time, store it in a useRef Hook and
  keep the mutable value in the '.current' property.
  Otherwise, you can move this variable directly
  inside useEffect. (react-hooks/exhaustive-deps)
   */
  useEffect(() => {
    currentTabName = TAB_CONFIG[currentTabIndex].name;
  }, [currentTabIndex]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTabIndex}
          onChange={(event, newIndex) => {
            setCurrentTabIndex(newIndex);
          }}
          aria-label="Navigation Tab"
        >
          <Tab label={TAB_CONFIG[0].label} />
          <Tab label={TAB_CONFIG[1].label} />
          <Tab label={TAB_CONFIG[2].label} />
        </Tabs>
      </Box>
      <NavigationContext.Provider
        value={{
          tabIndex: currentTabIndex,
          tabName: TAB_CONFIG[currentTabIndex].name,
        }}
      >
        <TabPanel value={currentTabIndex} index={0}>
          <Time />
          <Logo />
          <Prediction tabContext={NavigationContext} />
        </TabPanel>
        <TabPanel value={currentTabIndex} index={1}>
          <MapView tabContext={NavigationContext} />
        </TabPanel>
        <TabPanel value={currentTabIndex} index={2}>
          <EmailSignup tabContext={currentTabIndex} index={2} />
        </TabPanel>
      </NavigationContext.Provider>
    </Box>
  );
};

export default NavigationTab;
