import { ParsedLog } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from "@mui/material"
import TabSection from "../TabSection/TabSection"
import TableComp from "../TableComp/Table"
import TimeSeriesGraph from "../TimeSeriesGraph/TimeSeriesGraph"
import TimeSeriesGraphDiscrete from "../TimeSeriesGraph/TimeSeriesGraphDiscrete"

const StateInfoHeaders = {
    timestamp: {
        title: "Timestamp",
        transform: transformNumberToDate
    },
    errorCount: { title: "Error Count" },
    obc: { title: "OBC" },
    operationState: { title: "Operation State" },
    satEventHistory: { title: "SAT Event History" }
} as const

const OBCHeaders = {
    obc: { title: "OBC" }
} as const

type Props = {
    logs: Array<ParsedLog>
}

const obcStates = { "FAILED": 0, "DEGRADED": 1, "OPERATIONAL": 2 } as const
const operationStates = { "LOW_POWER": 0, "ANTENNA_DEPLOYED": 1, "HELLO_WORLD": 2, "IDLE": 3 } as const
const satEventHistoryStates = { "BATTERY_CHARGED": 3, "ANTENNA_DEPLOYED": 1, "INITIAL_FLASH": 2, "NULL": 0 } as const



// This component should show errorCount, obc ,operationState, and satEventHistory
export default function StateInfo(props: Props) {
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
                State Information
            </Typography>

            <TabSection
                sectionName="StateInfo"
                tabsStyle={{
                    backgroundColor: "white",
                    marginBottom: "20px",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px"
                }}
                tabContents={[
                    {
                        label: "Error Count",
                        component: (
                            <TimeSeriesGraph
                                scatterPlotMargin={{ left: 0, top: 10 }}
                                title="Error Count"
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    backgroundColor: "white",
                                    padding: "20px",
                                    borderRadius: "5px"
                                }}
                                timeSeriesData={[
                                    {
                                        name: "StateInfo",
                                        color: "#1AA7EC",
                                        data: logs.map(log => ({ time: log.timestamp, value: log.errorCount }))
                                    },
                                ]}
                            />
                        ),
                    },
                    {
                        label: "OBC",
                        component: (
                            <TimeSeriesGraphDiscrete
                                scatterPlotMargin={{ left: 40, top: 10 }}
                                title="OBC"
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    backgroundColor: "white",
                                    padding: "20px",
                                    borderRadius: "5px"
                                }}
                                timeSeriesData={[
                                    {
                                        name: "StateInfo",
                                        color: "#53BDA5",
                                        data: logs.map(log => ({ time: log.timestamp, value: obcStates[log.obc] })),
                                    }
                                ]}
                                labelMapping={{
                                    2: "Operational",
                                    1: "Degraded",
                                    0: "Failed"
                                } as const}
                            />
                        )
                    },
                    {
                        label: "Operational State",
                        component: (
                            <TimeSeriesGraphDiscrete
                                scatterPlotMargin={{ left: 30, top: 10 }}
                                title="OBC"
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    backgroundColor: "white",
                                    padding: "20px",
                                    borderRadius: "5px"
                                }}
                                timeSeriesData={[
                                    {
                                        name: "StateInfo",
                                        color: "#797EF6",
                                        data: logs.map(log => ({ time: log.timestamp, value: operationStates[log.operationState] }))
                                    }
                                ]}
                                labelMapping={{
                                    3: "Idle",
                                    2: "Hello World",
                                    1: "Antenna Deployed",
                                    0: "Low Power"
                                } as const}
                            />
                        )
                    },
                    {
                        label: "SAT Event History",
                        component: (
                            <TimeSeriesGraphDiscrete
                                scatterPlotMargin={{ left: 20, top: 20 }}
                                title="OBC"
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    backgroundColor: "white",
                                    padding: "20px",
                                    borderRadius: "5px"
                                }}
                                timeSeriesData={[
                                    {
                                        name: "StateInfo",
                                        color: "#FC8955",
                                        data: logs.map(log => ({ time: log.timestamp, value: log.satEventHistory === null ? 0 : satEventHistoryStates[log.satEventHistory] }))
                                    }
                                ]}
                                labelMapping={{
                                    0: "Null",
                                    2: "Initial Flash",
                                    1: "Antenna Deployed",
                                    3: "Battery Charged"
                                } as const}
                            />
                        )
                    },
                    {
                        label: "StateInfo Table",
                        component: (
                            <TableComp
                                id="StateInfo"
                                tableHeaders={StateInfoHeaders}
                                data={logs}
                                style={{ height: "400px", }}
                            />
                        )
                    }
                ]}

            />

        </div>
    )
}