import { encodeGetParams } from '@/util/queryParams';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Fab, Grid, Modal, Radio, TextField, Typography } from "@mui/material";
import { isEqual } from 'lodash';
import moment from 'moment';
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import DateTimeField from '../Form/DateTimeField';
const TEN_DAYS_IN_SECONDS = 864000

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
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Grid
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                container
                spacing={1}
                style={{
                    marginBottom: "-20px"
                }}
            >
                {
                    props.queryParams.mode === "offset"
                        ?
                        <React.Fragment>
                            <Grid item>
                                <Fab
                                    size="small"
                                    color="primary"
                                    disabled={props.numLogsBefore === 0}
                                    onClick={() => {
                                        if (props.queryParams.mode === "offset") {
                                            navigate(location.pathname + "/?" + encodeGetParams({
                                                ...props.queryParams,
                                                pageNo: props.queryParams.pageNo - 1
                                            }))
                                        }
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Typography display="inline-block">
                                    {props.queryParams.pageNo}
                                </Typography>
                            </Grid>
                            <Grid item style={{ paddingRight: "20px" }}>
                                <Fab

                                    size="small"
                                    color="primary"
                                    disabled={props.numLogsAfter === 0}
                                    onClick={() => {
                                        if (props.queryParams.mode === "offset") {
                                            navigate(location.pathname + "/?" + encodeGetParams({
                                                ...props.queryParams,
                                                pageNo: props.queryParams.pageNo + 1
                                            }))
                                        }
                                    }}
                                >
                                    <ChevronRightIcon />
                                </Fab>
                            </Grid>
                        </React.Fragment>
                        : null
                }
                <Grid item>
                    <Fab
                        size="small"
                        color="primary"
                        onClick={() => setOpen(true)}
                    >
                        <FilterListIcon />
                    </Fab>
                </Grid>
            </Grid>
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
                    <FilterForm queryParams={props.queryParams} close={() => setOpen(false)} />
                </div>
            </Modal>
        </React.Fragment>
    )
}

function FilterForm(props: { queryParams: DashboardQueryParam, close: () => void }) {
    const [mode, setMode] = useState(props.queryParams.mode)
    const location = useLocation()
    const navigate = useNavigate()
    const [countString, setCountString] = useState(`${props.queryParams.mode === "offset" ? props.queryParams.count : 40}`)
    const [count, setCount] = useState<number | null>(props.queryParams.mode === "offset" ? props.queryParams.count : 40)
    const [startDateTime, setStartDateTime] = useState<moment.Moment | null>(props.queryParams.mode === "timeRange"
        ? moment.unix(Math.floor(props.queryParams.start))
        : moment.unix(Math.floor((Date.now() / 1000 - TEN_DAYS_IN_SECONDS)))
    )
    const [endDateTime, setEndDateTime] = useState<moment.Moment | null>(props.queryParams.mode === "timeRange"
        ? moment.unix(Math.floor(props.queryParams.end))
        : moment.unix(Math.floor(Date.now() / 1000))
    )

    const generateNewQueryParams = () => {
        if (
            count !== null &&
            startDateTime !== null &&
            endDateTime !== null &&
            endDateTime > startDateTime
        ) {
            if (mode === "offset") {
                return {
                    mode,
                    pageNo: 1,
                    count
                }
            }
            else {
                return {
                    mode,
                    start: startDateTime.unix(),
                    end: endDateTime.unix()
                }
            }
        }
        else {
            return null
        }
    }


    const applyButtonEnabled = () => {
        const newQueryParams = generateNewQueryParams()

        if (newQueryParams !== null) {
            if (isEqual(newQueryParams, props.queryParams)) {
                return false
            }

            if (newQueryParams.mode === "offset" && props.queryParams.mode === "offset" && newQueryParams.count === props.queryParams.count) {
                return false
            }

            return true
        }
        return false
    }

    const applyQueryParams = () => {
        const newQueryParams = generateNewQueryParams()
        if (newQueryParams !== null) {
            navigate(location.pathname + '/?' + encodeGetParams(newQueryParams))
        }
    }

    return (

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
                    Page Number
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
            {
                mode === "offset" ?
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Number of logs per page"
                            value={countString}
                            onChange={(e) => {
                                const stringValue = e.target.value
                                if (z.coerce.number().min(1).int().safeParse(stringValue).success) {
                                    setCount(Number(stringValue))
                                }
                                else {
                                    setCount(null)
                                }
                                if (stringValue === "" || z.coerce.number()) {
                                    setCountString(stringValue)
                                }
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    :
                    <React.Fragment>
                        <Grid item xs={12}>
                            <DateTimeField
                                fullWidth
                                variant="outlined"
                                label="Start time"
                                value={startDateTime}
                                onChange={(newStartDateTime) => setStartDateTime(newStartDateTime)}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <DateTimeField
                                fullWidth
                                variant="outlined"
                                label="End time"
                                value={endDateTime}
                                onChange={(newEndDateTime) => setEndDateTime(newEndDateTime)}
                            />
                        </Grid>
                    </React.Fragment>
            }
            <Grid item xs={12}
                style={{
                    position: "sticky",
                    bottom: 0
                }}
            >
                <Grid container spacing={1} justifyContent="right">
                    <Grid item>
                        <Button variant="contained" onClick={props.close}>
                            <Typography style={{ textTransform: "none" }}>
                                Close
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            disabled={!applyButtonEnabled()}
                            onClick={() => {
                                applyQueryParams()
                                props.close()
                            }}
                        >
                            <Typography style={{ textTransform: "none" }}>
                                Save
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


