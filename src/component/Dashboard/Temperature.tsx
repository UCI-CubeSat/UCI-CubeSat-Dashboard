import { Log } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from "@mui/material"
import TabSection from "../TabSection/TabSection"
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
    logs: Array<Log>
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

            <TabSection
                sectionName="Temperature"
                tabsStyle={{
                    backgroundColor: "white",
                    marginBottom: "20px",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px"
                }}
                tabContents={[
                    {
                        label: "Thermistor 1",
                        component: (
                            <TimeSeriesGraph //modifies style of time/series graph only
                                scatterPlotMargin={{ left: 30, top: 10 }}
                                title="Thermistor 1"
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
                                        color: "#006400",
                                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor1 }))
                                    },
                                ]}
                            />
                        )

                    },
                    {
                        label: "Thermistor 2",
                        component: (
                            <TimeSeriesGraph //modifies style of time/series graph only
                                scatterPlotMargin={{ left: 30, top: 10 }}
                                title="Thermistor 2"
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
                                        color: "#FF0000",
                                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor2 }))
                                    },
                                ]}
                            />
                        )
                    },
                    {
                        label: "Thermistor 3",
                        component: (
                            <TimeSeriesGraph //modifies style of time/series graph only
                                scatterPlotMargin={{ left: 30, top: 10 }}
                                title="Thermistor 3"
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
                                        color: "#0000FF",
                                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor3 }))
                                    },
                                ]}
                            />
                        )
                    },
                    {
                        label: "Thermistor 4",
                        component: (
                            <TimeSeriesGraph //modifies style of time/series graph only
                                scatterPlotMargin={{ left: 30, top: 10 }}
                                title="Thermistor 4"
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
                                        color: "#FFA500",
                                        data: logs.map(log => ({ time: log.timestamp, value: log.themistor4 }))
                                    },
                                ]}
                            />
                        )
                    },
                    {
                        label: "Temperature Table",
                        component: (
                            <TableComp
                                id="Temperature"
                                tableHeaders={TemperatureHeaders}
                                data={logs}
                                style={{ height: "400px", }}
                            />
                        )
                    },

                ]}

            />

        </div>
    )
}