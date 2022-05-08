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

import AppBar from "@mui/material/AppBar";
import { Toolbar } from "@mui/material";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
        <Box sx={{ p: 3, color: "white" }}>
          <Typography>{props.children}</Typography>
        </Box>
      )}
    </div>
  );
};

const styles = {
  tab: {
    color: "white",
  },
};

const NavigationTab = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  return (
    <Box sx={{ width: "100%", min_height: "100vh", bgcolor: "#24363E" }}>
      <AppBar position="sticky">
        <Toolbar sx={{justifyContent: "space-between", bgcolor: "#24363E"}}>
          <Box sx={{marginTop: "8px"}}>
            <Logo />
          </Box>
          <Box>
            <Tabs
              value={currentTabIndex}s
              onChange={(event, newIndex) => {
                setCurrentTabIndex(newIndex);
              }}
              aria-label="Navigation Tab"
              TabIndicatorProps={{
                sx: {
                  bgcolor: "gray"
                }
              }}
            >
              <Tab
                label={TAB_CONFIG[0].label}
                icon={<SatelliteAltIcon/>}
                style={styles.tab}/>
              <Tab
                label={TAB_CONFIG[1].label}
                icon={<LocationOnIcon/>}
                style={styles.tab}/>
              <Tab
                label={TAB_CONFIG[2].label}
                icon={<EmailIcon/>}
                style={{color: "#24363E", backgroundColor: "white"}}/>
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      <PageContext.Provider
        value={{
          tabIndex: currentTabIndex,
          tabName: TAB_CONFIG[currentTabIndex].name,
        }}
      >
        <TabPanel value={currentTabIndex} index={0}>
          <Time />
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
