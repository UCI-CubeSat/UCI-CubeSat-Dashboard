import { transformNumberToDate } from "@/util/transform";
import { Typography } from "@mui/material";
import {
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type ScatterPlotMargin = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

type TimeSeriesData = {
    name: string,
    color: string,
    data: Array<{
        time: number,
        value: number | null
    }>
}

type Props = {
    scatterPlotMargin?: ScatterPlotMargin,
    timeSeriesData: Array<TimeSeriesData>,
    style?: React.CSSProperties,
    title: string
}

const getDomain = (timeSeriesData: Array<TimeSeriesData>) => {
    let maxValue: number | undefined = undefined
    let minValue: number | undefined = undefined
    for (let i = 0; i < timeSeriesData.length; i++) {
        for (let j = 0; j < timeSeriesData[i].data.length; j++) {
            const currentValue = timeSeriesData[i].data[j].value
            if (currentValue !== null && (maxValue === undefined || currentValue > maxValue)) {
                maxValue = currentValue
            }
            if (currentValue !== null && (minValue === undefined || currentValue < minValue)) {
                maxValue = currentValue
            }
        }
    }
    return {
        min: minValue,
        max: maxValue
    }
}

export default function TimeSeriesGraph(props: Props) {
    const { timeSeriesData, style, title } = props
    const { min, max } = getDomain(timeSeriesData)
    return (
        <div style={style}>
            <Typography align="center" gutterBottom>
                {title}
            </Typography>
            <div style={{ width: "100%", height: "calc(100% - 24px)" }}>
                <ResponsiveContainer width="100%" height="100%" >
                    <ScatterChart margin={props.scatterPlotMargin}>
                        <XAxis
                            dataKey='time'
                            domain={['auto', 'auto']}
                            name='Time'
                            tickFormatter={transformNumberToDate}
                            type='number'
                        />
                        <YAxis
                            dataKey='value'
                            name='Value'
                            style={{ width: "300px" }}
                            domain={min !== undefined && max !== undefined ? [min, max] : undefined} />
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