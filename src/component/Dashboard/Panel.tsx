import { ParsedLog } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from "@mui/material"
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
            <TableComp
                id="Panel"
                tableHeaders={PanelHeaders}
                data={logs}
                style={{ maxHeight: "300px", marginTop: "20px" }}
            />

        </div>
    )
}