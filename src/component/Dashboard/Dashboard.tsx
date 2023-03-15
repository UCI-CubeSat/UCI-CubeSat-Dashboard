import { satelliteLogs } from '@/api/satetllite'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { ZodError } from 'zod'
import Battery from './Battery'
import Filter, { TimeRange } from './Filter'
import Location from './Location'
import Panel from './Panel'
import StateInfo from './StateInfo'
import Temperature from './Temperature'
const TEN_MINUTES_IN_MS = 600000

export default function Dashboard() {
    const [range, setRange] = useState<TimeRange>({ start: null, end: null })
    const { start, end } = range
    const response = useQuery({
        queryKey: ['satellite', 'logList', start, end],
        queryFn: async () => await satelliteLogs({ start: start ?? 1000, end: end ?? Date.now() }),
        retry: false,
        staleTime: TEN_MINUTES_IN_MS,
        cacheTime: 0
    })

    const logs = response.data?.logs ?? []
    return (
        <Grid container>
            <Grid item xs={12}>
                <Filter
                    {...range}
                    setRange={setRange}
                />
            </Grid>
            {
                response.isLoading ? <span>Loading...</span> :
                    response.isError ?
                        <span>{response.error instanceof ZodError ? "There was an issue validating the data" : "There was an error in fetching data"}</span>
                        :
                        (
                            <React.Fragment>
                                <Grid item lg={6} xs={12}>
                                    <Location logs={logs} />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Panel logs={logs} />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Battery logs={logs} />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Temperature logs={logs} />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <StateInfo logs={logs} />
                                </Grid>
                            </React.Fragment>
                        )}
        </Grid>
    )

}