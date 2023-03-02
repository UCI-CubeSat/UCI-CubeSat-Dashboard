import { transformNumberToDate } from "@/util/transform"
import { Typography } from "@mui/material"

import {
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'


type TimeSeriesData = {
    name: string,
    color: string,
    data: Array<{
        time: number,
        value: number | null
    }>
}

type Props = {
    timeSeriesData: Array<TimeSeriesData>,
    style?: React.CSSProperties,
    title: string
}
export default function TimeSeriesGraph(props: Props) {
    const { timeSeriesData, style, title } = props
    return (
        <div style={style}>
            <Typography align="center" gutterBottom>
                {title}
            </Typography>
            <div style={{ width: "100%", height: "calc(100% - 24px)" }}>
                <ResponsiveContainer width="100%" height="100%" >
                    <ScatterChart>
                        <XAxis
                            dataKey='time'
                            domain={['auto', 'auto']}
                            name='Time'
                            tickFormatter={transformNumberToDate}
                            type='number'
                        />
                        <YAxis dataKey='value' name='Value' />
                        <Tooltip<string | number, string>
                            formatter={(value, name, props) => {
                                console.log(name)
                                if (name === "Time") {

                                    return [transformNumberToDate(value), name]
                                }
                                else {
                                    return [value, name]
                                }
                            }}
                        />
                        <Legend />
                        {timeSeriesData.map((timeSeries, index) => (
                            <Scatter
                                key={`table-${index}-data-${timeSeries.name}`}
                                data={timeSeries.data}
                                line={{ stroke: timeSeries.color }}
                                lineJointType='monotoneX'
                                lineType='joint'
                                fill={timeSeries.color}
                                name={timeSeries.name}
                            />

                        ))}

                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}