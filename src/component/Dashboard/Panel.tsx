import { ParsedLog } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from "@mui/material"
import TabSection from "../TabSection/TabSection"
import TableComp from "../TableComp/Table"
import TimeSeriesGraph from "../TimeSeriesGraph/TimeSeriesGraph"

const PanelHeaders = {
    timestamp: {
        title: "Timestamp",
        transform: transformNumberToDate
    },
    panelVoltage: { title: "Panel Voltage" },
    panelCurrent: { title: "Pannel Current" }
} as const

type Props = {
    logs: Array<ParsedLog>
}
// This component should show panelVoltage and panelCurrent
export default function Panel(props: Props) {
    const { logs } = props
    return (
        <div
            style={{
                width: "100%",
                padding: "20px"
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
            >
                Panel
            </Typography>
            <TabSection
                sectionName="Panel"
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
                                title="Panel Voltage"
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
                                        data: logs.map(log => ({ time: log.timestamp, value: log.panelVoltage }))
                                    },
                                ]}
                            />
                        ),
                    },
                    {
                        label: "Current",
                        component: (
                            <TimeSeriesGraph
                                title="Panel Current"
                                style={{
                                    marginTop: "20px",
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
                                        data: logs.map(log => ({ time: log.timestamp, value: log.panelCurrent }))
                                    }
                                ]}
                            />
                        )
                    },
                    {
                        label: "Panel Table",
                        component: (
                            <TableComp
                                id="Panel"
                                tableHeaders={PanelHeaders}
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
    )
}

/*




*/