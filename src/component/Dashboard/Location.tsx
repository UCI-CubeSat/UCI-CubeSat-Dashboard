import { Log } from "@/model/log"
import { transformNumberToDate } from "@/util/transform"
import { Typography } from '@mui/material'
import TabSection from "../TabSection/TabSection"
import TableComp from "../TableComp/Table"
import { MemoMapLayer } from "../map/mapLayer"

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
    logs: Array<Log>
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
            <TabSection
                sectionName="Location"
                tabsStyle={{
                    backgroundColor: "white",
                    marginBottom: "20px",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px"
                }}
                tabContents={[
                    {
                        label: "Map",
                        component: (
                            <MemoMapLayer
                                coordinates={logs}
                                style={{
                                    height: "400px",
                                    width: "100%",
                                }}
                            />
                        )

                    },
                    {
                        label: "Location Table",
                        component: (
                            <TableComp
                                id="Map"
                                tableHeaders={MapHeaders}
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

/*

            
*/