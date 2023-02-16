import Time from "@/component/Clock/clock";
import Logo from "@/component/Logo/logo";
import Dashboard from "@/component/page/dashboard";
import EmailSignup from "@/component/page/emailSignup";
import Tracker from "@/component/page/tracker";
import { TAB_CONFIG } from "@/util/config";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";

export const PageContext = React.createContext({
  tabIndex: 0,
  tabName: TAB_CONFIG[0],
});

type TabPanelProps = {
  value: number,
  index: number,
}

const TabPanel: React.FC<React.PropsWithChildren<TabPanelProps>> = (props) => {

  return (
    <div
      role="tabPanel"
      hidden={props.value !== props.index}
      id={`navigation-tabPanel-${props.index}`}
      aria-labelledby={`tab-${props.index}`}
    >
      {props.value === props.index && (
        <Box sx={{ p: 3, height: "100vh", color: "white" }}>
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
    <Box sx={{ width: "100%", minHeight: "300vh", bgcolor: "#464a54" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between", bgcolor: "#464a54" }}>
          <Box sx={{ marginTop: "8px" }}>
            <Logo />
          </Box>
          <Box>
            <Tabs
              value={currentTabIndex}
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
                icon={<SatelliteAltIcon />}
                style={styles.tab} />
              <Tab
                label={TAB_CONFIG[1].label}
                icon={<LocationOnIcon />}
                style={styles.tab} />
              <Tab
                label={TAB_CONFIG[2].label}
                icon={<DashboardIcon />}
                style={styles.tab} />
              <Tab
                label={TAB_CONFIG[3].label}
                icon={<EmailIcon />}
                style={{ color: "#464a54", backgroundColor: "white" }} />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      <PageContext.Provider
        value={{
          tabIndex: currentTabIndex,
          tabName: TAB_CONFIG[currentTabIndex],
        }}
      >
        <TabPanel value={currentTabIndex} index={0}>
          <Time />
        </TabPanel>
        <TabPanel value={currentTabIndex} index={1}>
          <Tracker />
        </TabPanel>
        <TabPanel value={currentTabIndex} index={2}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={currentTabIndex} index={3}>
          <EmailSignup />
        </TabPanel>
      </PageContext.Provider>
    </Box>
  );
};

export default NavigationTab;
