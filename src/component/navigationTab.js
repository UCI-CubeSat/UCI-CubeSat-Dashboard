/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Time from './clock';
import Logo from './logo';
import Prediction from './prediction';
import EmailSignup from './emailSignup';
import MapView from './mapView';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabPanel"
      hidden={value !== index}
      id={`navigation-tabPanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const NavigationTab = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          aria-label="Navigation Tab">
          <Tab label="Pass Prediction" />
          <Tab label="Live Satellite Tracker" />
          <Tab label="Email" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Time />
        <Logo />
        <Prediction />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MapView />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmailSignup />
      </TabPanel>
    </Box>
  );
};

export default NavigationTab;
