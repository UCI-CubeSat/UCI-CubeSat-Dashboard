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

type TimeSeriesDataDiscrete<T> = {
    name: string,
    color: string,
    data: Array<{
        time: number,
        value: T
    }>
}

type Props<T extends number | string | symbol> = {
    scatterPlotMargin?: ScatterPlotMargin,
    timeSeriesData: Array<TimeSeriesDataDiscrete<T | null>>,
    style?: React.CSSProperties,
    title: string,
    labelMapping: Record<T, string>
}



export default function TimeSeriesGraphDiscrete<T extends number | string | symbol>(props: Props<T>) {
    const { timeSeriesData, style, title, labelMapping } = props
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
                            ticks={Object.keys(labelMapping)}
                            name='Value'
                            tickFormatter={(value: T) => value === null ? value : labelMapping[value]}
                            style={{ width: "300px" }}
                        />
                        <Tooltip<string | number, string>
                            formatter={(value, name) => {
                                if (name === "Time") {

                                    return [transformNumberToDate(value), name]
                                }
                                else {
                                    return [value === null ? value : labelMapping[value as T], name]
                                }
                            }}
                        />
                        <Legend />
                        {timeSeriesData.map((timeSeries, index) => (
                            <Scatter
                                key={`table-${index}-data-${timeSeries.name}`}
                                data={timeSeries.data}
                                line={{ stroke: timeSeries.color }}
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