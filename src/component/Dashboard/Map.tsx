import { ParsedLog } from "@/model/log"
import { Typography } from '@mui/material'
import React from "react"
import TableComp from "../TableComp/Table"
import MapLayer from "../map/mapLayer"

const MapHeaders = {
    timestamp: {
        title: "Timestamp", transform: (value: number | string | null) => {
            if (value === null) {
                return "Invalid date"
            }
            else {
                return new Date(value).toLocaleDateString()
            }
        }
    },
    lat: { title: "Latitude" },
    lon: { title: "Longitude" },
    alt: { title: "Altitude" }
} as const



type Props = {
    logs: Array<ParsedLog>
}
// This component should show lat, lon, and alt
export default function Map(props: Props) {
    const { logs } = props
    return (
        <React.Fragment>
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
                    Map
                </Typography>
                <MapLayer
                    coordinates={logs}
                    style={{
                        height: "400px",
                        width: "100%"
                    }}
                />
                <TableComp
                    id="Map"
                    tableHeaders={MapHeaders}
                    data={logs}
                    style={{ maxHeight: "300px", marginTop: "20px" }}
                />
            </div>
        </React.Fragment>
    )
}