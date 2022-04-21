import React from "react";
import Time from "../util/clock";
import EmailSignup from "../page/emailSignup";
import Tracker from "../page/tracker";
import Logo from "../util/logo";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TAB_CONFIG } from "../../util/config";

export const PageContext = React.createContext({
  tabIndex: 0,
  tabName: TAB_CONFIG[0],
});

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
      <PageContext.Provider
        value={{
          tabIndex: currentTabIndex,
          tabName: TAB_CONFIG[currentTabIndex].name,
        }}
      >
        <TabPanel value={currentTabIndex} index={0}>
          <Time />
          <Logo />
        </TabPanel>
        <TabPanel value={currentTabIndex} index={1}>
          <Tracker />
        </TabPanel>
        <TabPanel value={currentTabIndex} index={2}>
          <EmailSignup />
        </TabPanel>
      </PageContext.Provider>
    </Box>
  );
};

export default NavigationTab;