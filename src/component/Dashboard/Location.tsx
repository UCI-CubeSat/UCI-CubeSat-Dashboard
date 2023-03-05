import { ParsedLog } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from '@mui/material'
import TableComp from "../TableComp/Table"
import MapLayer from "../map/mapLayer"

const MapHeaders = {
    timestamp: {
        title: "Timestamp",
        transform: transformNumberToDate
    },
    lat: { title: "Latitude" },
    lon: { title: "Longitude" },
    alt: { title: "Altitude" }
} as const



type Props = {
    logs: Array<ParsedLog>
}
// This component should show lat, lon, and alt
export default function Location(props: Props) {
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
                Map
            </Typography>
            <MapLayer
                coordinates={logs}
                style={{
                    height: "400px",
                    width: "100%",
                    marginBottom: "20px"
                }}
            />
            <TableComp
                id="Map"
                tableHeaders={MapHeaders}
                data={logs}
                style={{ maxHeight: "300px" }}
            />
        </div>
    )
}