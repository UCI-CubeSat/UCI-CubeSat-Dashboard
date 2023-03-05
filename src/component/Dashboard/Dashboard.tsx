import { satelliteLogs } from '@/api/satetllite'
import { Grid } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Battery from './Battery'
import Location from './Location'
import Panel from './Panel'
import StateInfo from './StateInfo'
import Temperature from './Temperature'

const TEN_MINUTES_IN_MS = 600000

export default function Dashboard() {
    const [start, setStart] = useState<number | null>(null)
    const [end, setEnd] = useState<number | null>(null)
    const response = useQuery({
        queryKey: ['satellite', 'logList', start, end],
        queryFn: async () => await satelliteLogs({ start: start ?? 1, end: end ?? Date.now() }),
        retry: false,
        staleTime: TEN_MINUTES_IN_MS
    })

    if (response.isLoading) {
        return <span>Loading...</span>
    }
    else if (response.isError) {
        return <span>There was an error in fetching data</span>
    }
    else {
        const logs = response.data?.logs ?? []
        return (
            <Grid container>
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
            </Grid>
        )
    }

}