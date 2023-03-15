import { Radio, Typography } from "@mui/material"
import moment from "moment"
import React from "react"

const TEN_DAYS_IN_MS = 8.64e+8

export type TimeRange = {
    start: number,
    end: number
} | {
    start: null,
    end: null
}

const calcValue = (start: number | null, end: number | null) => {
    if (start === null && end === null) {
        return "all"
    }
    else {
        return "timeRange"
    }
}

const getDateString = (timeInMS: number) => {
    return moment.unix(Math.floor(timeInMS / 1000)).format("YYYY-MM-DD")
}


type Props = TimeRange & {
    setRange: React.Dispatch<React.SetStateAction<TimeRange>>
}
export default function Filter(props: Props) {
    const value = calcValue(props.start, props.end)
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
                Select
            </Typography>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Radio
                    checked={value === "all"}
                    onClick={() => {
                        props.setRange({
                            start: null,
                            end: null
                        })
                    }}
                />
                <Typography>
                    All
                </Typography>
                <Radio
                    checked={value === "timeRange"}
                    onClick={() => {
                        props.setRange({
                            start: Date.now() - TEN_DAYS_IN_MS,
                            end: Date.now()
                        })
                    }}
                />
                <Typography>
                    Time Range
                </Typography>
                {
                    props.start !== null ?
                        <div style={{
                            marginLeft: "20px"
                        }}>
                            <label
                                style={{ marginRight: "5px" }}
                            >
                                Start:
                            </label>

                            <input
                                style={{
                                    height: "30px",
                                    fontSize: "16px",
                                    outline: "none"
                                }}
                                type="date"
                                value={getDateString(props.start)}
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        const newStart = moment(e.target.value).startOf('day').unix() * 1000
                                        if (props.start !== newStart && newStart < props.end && newStart > 0) {
                                            props.setRange({
                                                start: newStart,
                                                end: props.end
                                            })
                                        }
                                    }

                                }} />
                            <label
                                style={{ marginRight: "5px", marginLeft: "10px" }}
                            >
                                End:
                            </label>
                            <input
                                style={{
                                    height: "30px",
                                    fontSize: "16px"
                                }}
                                type="date"
                                value={getDateString(props.end)}
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        const newEnd = moment(e.target.value).endOf('day').unix() * 1000
                                        if (props.end !== newEnd && newEnd > props.start) {
                                            props.setRange({
                                                start: props.start,
                                                end: newEnd
                                            })
                                        }
                                    }
                                }}
                            />
                        </div>
                        : null

                }
            </div>
        </div>
    )
}