import { ParsedLog } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from "@mui/material"
import Box from '@mui/material/Box'
import * as React from 'react'
import TabSection from "../TabSection/TabSection"
import TableComp from "../TableComp/Table"
import TimeSeriesGraph from "../TimeSeriesGraph/TimeSeriesGraph"

// This constant defines an object that contains the headers for the battery logs.
const BatteryHeaders = {
    timestamp: {
        title: "Timestamp",
        transform: transformNumberToDate
    },
    batteryVoltage: { title: "Battery Voltage" },
    batteryCurrent: { title: "Battery Current" },
    batteryTemp: { title: "Battery Temp" },
    chargingVoltage: { title: "Charging Voltage" },
    // isCharging: {
    //     title: "Is Charing",
    //     }
} as const;

// This type defines the props for the Battery component.
type TabPanelProps = {
    logs: Array<ParsedLog>,
    children?: React.ReactNode,
    index: number,
    value: number
};

type BatteryProps = {
    logs: Array<ParsedLog>,
}

// This function returns the accessibility properties for the specified tab index.
function a11yProps(index: number) {
    return {
        id: `battery-tab-${index}`,
        'aria-controls': `battery-tabpanel-${index}`,
    };
};

// This function defines the TabPanel component.
function TabPanel(props: TabPanelProps) {
    const { children, index, value } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`battery-tabpanel-${index}`}
            aria-labelledby={`battery-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

// This component should show batteryVoltage, batteryCurrent, batteryTemp, chargingVoltage, and isCharging
export default function Battery(props: BatteryProps) {
    const { logs } = props
    const [value, setValue] = React.useState(0);

    // This function updates the selected tab.
    const handleChange = (
        event: React.SyntheticEvent,
        newValue: number
    ) => {
        setValue(newValue);
    };

    return (
        <div
            style={{
                width: "100%",
                padding: "20px",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
            >
                Battery
            </Typography>
            <div
            >
                <TabSection
                    sectionName="Battery"
                    tabsStyle={{
                        backgroundColor: "white",
                        marginBottom: "20px",
                        padding: "10px",
                        width: "100%",
                        borderRadius: "5px"
                    }}
                    tabContents={[
                        {
                            label: "Voltage",
                            component: (
                                <TimeSeriesGraph
                                    title="Battery Voltage"
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        padding: "20px",
                                        borderRadius: "5px"
                                    }}
                                    timeSeriesData={[
                                        {
                                            name: "Voltage",
                                            color: "#8884d8",
                                            data: logs.map(log => ({ time: log.timestamp, value: log.batteryVoltage }))
                                        },
                                    ]}
                                />
                            )
                        },
                        {
                            label: "Current",
                            component: (
                                <TimeSeriesGraph
                                    title="Battery Current"
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        padding: "20px",
                                        borderRadius: "5px"
                                    }}
                                    timeSeriesData={[
                                        {
                                            name: "Current",
                                            color: "#82ca9d",
                                            data: logs.map(log => ({ time: log.timestamp, value: log.batteryCurrent }))
                                        }
                                    ]}
                                />
                            )
                        },
                        {
                            label: "Temperature",
                            component: (
                                <TimeSeriesGraph
                                    title="Battery Temperature"
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        padding: "20px",
                                        borderRadius: "5px"
                                    }}
                                    timeSeriesData={[
                                        {
                                            name: "Temperature",
                                            color: "#db8f4d",
                                            data: logs.map(log => ({ time: log.timestamp, value: log.batteryTemp }))
                                        }
                                    ]}
                                />
                            )
                        },
                        {
                            label: "Is Charging",
                            component: (
                                <TimeSeriesGraph
                                    title="Is Charging"
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        padding: "20px",
                                        borderRadius: "5px"
                                    }}
                                    timeSeriesData={[
                                        {
                                            name: "Boolean",
                                            color: "#48CAD3",
                                            data: logs.map(log => ({ time: log.timestamp, value: log.isCharging ? 0 : 1 }))
                                        }
                                    ]}
                                />
                            )
                        },
                        {
                            label: "Charging Voltage",
                            component: (
                                <TimeSeriesGraph
                                    title="Charging Voltage"
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        padding: "20px",
                                        borderRadius: "5px"
                                    }}
                                    timeSeriesData={[
                                        {
                                            name: "Voltage",
                                            color: "#5273de",
                                            data: logs.map(log => ({ time: log.timestamp, value: log.chargingVoltage }))
                                        }
                                    ]}
                                />
                            )
                        },
                        {
                            label: "Battery Table",
                            component: (
                                <TableComp
                                    id="Battery"
                                    tableHeaders={BatteryHeaders}
                                    data={logs}
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        borderRadius: "5px"
                                    }}
                                />
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
}

/*
<Tabs value={value} onChange={handleChange} aria-label="BatteryTabs" sx={{
                    bgcolor: "white",
                    marginBottom: "20px",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px"
                }}>
                    <Tab label="Voltage" {...a11yProps(0)} />
                    <Tab label="Current" {...a11yProps(1)} />
                    <Tab label="Temperature" {...a11yProps(2)} />
                    <Tab label="Is Charging" {...a11yProps(3)} />
                    <Tab label="Charging Voltage" {...a11yProps(4)} />
                    <Tab label="Battery Table" {...a11yProps(5)} />
                </Tabs>

                <TabPanel value={value} index={0} logs={logs}>
                    
                </TabPanel>
                <TabPanel value={value} index={1} logs={logs}>
                    
                </TabPanel>
                <TabPanel value={value} index={2} logs={logs}>
                    
                </TabPanel>

                <TabPanel value={value} index={3} logs={logs}>
                    
                </TabPanel>

                <TabPanel value={value} index={4} logs={logs}>

                </TabPanel>
                <TabPanel value={value} index={5} logs={logs}>

                </TabPanel>
*/