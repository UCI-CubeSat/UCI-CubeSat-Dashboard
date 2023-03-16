import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Grid, IconButton, Modal, Radio, Typography } from "@mui/material";
import React, { useState } from "react";
import { z } from 'zod';

// const TEN_DAYS_IN_MS = 8.64e+8

// const calcValue = (start: number | null, end: number | null) => {
//     if (start === null && end === null) {
//         return "all"
//     }
//     else {
//         return "timeRange"
//     }
// }

// const getDateString = (timeInMS: number) => {
//     return moment.unix(Math.floor(timeInMS / 1000)).format("YYYY-MM-DD")
// }

export const DashboardQueryParamValidator = z.discriminatedUnion("mode", [
    z.object({
        mode: z.literal("timeRange"),
        start: z.preprocess(Number, z.number().min(0)),
        end: z.preprocess(Number, z.number().min(0))
    }),
    z.object({
        mode: z.literal("offset"),
        pageNo: z.preprocess(Number, z.number().min(1)),
        count: z.preprocess(Number, z.number().min(1)),
    }),
])
export type DashboardQueryParam = z.infer<typeof DashboardQueryParamValidator>


type FilterProps = {
    queryParams: DashboardQueryParam,
    // Following only apply if using offset
    numLogsAfter: number | null,
    numLogsBefore: number | null
}

export default function Filter(props: FilterProps) {

    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState(props.queryParams.mode)

    return (
        <React.Fragment>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingRight: "10px",
                    paddingTop: "10px"
                }}
            >
                <Typography
                    display="inline-block"
                    variant="h6"
                    style={{
                        marginRight: "5px"
                    }}
                >
                    Filter:
                </Typography>
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <FilterListIcon />
                </IconButton>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "400px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                        padding: "15px"
                    }}
                >
                    <Grid container spacing={2} style={{ height: "100%" }}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>
                                Filter
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Radio
                                checked={mode === "offset"}
                                onClick={() => {
                                    setMode("offset")
                                }}
                            />
                            <Typography display="inline-block">
                                Paginated
                            </Typography>
                            <Radio
                                checked={mode === "timeRange"}
                                onClick={() => {
                                    setMode("timeRange")
                                }}
                            />
                            <Typography display="inline-block">
                                Time Range
                            </Typography>
                        </Grid>
                        <Grid item>
                            form
                        </Grid>
                        <Grid item xs={12}
                            style={{
                                position: "sticky",
                                bottom: 0
                            }}
                        >
                            <Grid container spacing={1} justifyContent="right">
                                <Grid item>
                                    <Button variant="contained" onClick={() => setOpen(false)}>
                                        <Typography style={{ textTransform: "none" }}>
                                            Close
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained">
                                        <Typography style={{ textTransform: "none" }}>
                                            Save
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </React.Fragment>
    )
}

