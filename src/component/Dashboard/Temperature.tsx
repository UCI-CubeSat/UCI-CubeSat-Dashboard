import { ParsedLog } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from "@mui/material"
import TableComp from "../TableComp/Table"
import TimeSeriesGraph from "../TimeSeriesGraph/TimeSeriesGraph"

const TemperatureHeaders = {
    timestamp: {
        title: "Timestamp",
        transform: transformNumberToDate
    },
    themistor1: { title: "Themistor 1" },
    themistor2: { title: "Themistor 2" },
    themistor3: { title: "Themistor 3" },
    themistor4: { title: "Themistor 4" }
} as const

type Props = {
    logs: Array<ParsedLog>
}
// This component should show themistor1, themistor2, themistor3, and themistor4
export default function Temperature(props: Props) {
    const { logs } = props
    return (
        <div
            style={{ //changes style of whole component
                width: "100%",
                padding: "20px"
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
            >
                Temperatures
            </Typography>

            <TimeSeriesGraph //modifies style of time/series graph only
                title="Temperatures"
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
                        name: "Themistor 1",
                        color: "#006400",
                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor1 }))
                    },
                    {
                        name: "Themistor 2",
                        color: "#FF0000",
                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor2 }))
                    },
                    {
                        name: "Themistor 3",
                        color: "#0000FF",
                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor3 }))
                    },
                    {
                        name: "Themistor 4",
                        color: "#FFA500",
                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor4 }))
                    }
                ]}
            />
            <TableComp
                id="Temperature"
                tableHeaders={TemperatureHeaders}
                data={logs}
                style={{ maxHeight: "300px", marginTop: "20px" }}
            />

        </div>
    )
}