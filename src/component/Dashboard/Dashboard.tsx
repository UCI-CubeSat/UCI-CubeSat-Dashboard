import { satellitesByOffset, satellitesByTimeRange } from '@/api/satetllite'
import { encodeGetParams, getQueryParamsGivenSearch } from '@/util/queryParams'
import { Grid } from '@mui/material'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { ZodError } from 'zod'
import Battery from './Battery'
import Filter, { DashboardQueryParam, DashboardQueryParamValidator } from './Filter'
import Location from './Location'
import Panel from './Panel'
import StateInfo from './StateInfo'
import Temperature from './Temperature'


const FIVE_MINUTES_IN_MS = 300000 as const

const DEFAULT_QUERY_PARAMS: DashboardQueryParam = {
    mode: "offset",
    pageNo: 1,
    count: 40
}

export default function Dashboard() {
    const location = useLocation()
    console.log(window.location.href)
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useState<DashboardQueryParam | null>(null)

    useEffect(() => {
        const currentQueryParams = getQueryParamsGivenSearch(location.search)
        try {
            const validatedQueryParams = DashboardQueryParamValidator.parse(currentQueryParams)
            setQueryParams(validatedQueryParams)
        }
        catch (e) {
            navigate(location.pathname + "/?" + encodeGetParams(DEFAULT_QUERY_PARAMS))
        }

    }, [location.search])

    if (queryParams !== null) {
        return <MemoizedDashboardContent queryParams={queryParams} />
    }
    else {
        return null
    }
}


type DashboardContentProps = {
    queryParams: DashboardQueryParam
}
const DashboardContent = (props: DashboardContentProps) => {

    const response = useQuery({
        queryKey: ['satellite', 'logs', props.queryParams],
        queryFn: async () => {
            if (props.queryParams.mode === "offset") {
                return await satellitesByOffset({ pageNo: props.queryParams.pageNo, count: props.queryParams.count })
            }
            else {
                return await satellitesByTimeRange({ start: props.queryParams.start, end: props.queryParams.end })
            }
        },
        retry: false,
        staleTime: FIVE_MINUTES_IN_MS,
        cacheTime: 0
    })
    const logs = response.data?.logs ?? []
    const numLogsAfter = response.data?.type === "offset" ? response.data.numLogsAfter : null
    const numLogsBefore = response.data?.type === "offset" ? response.data.numLogsBefore : null
    return (
        <Grid container>
            <Grid item xs={12}>
                <Filter
                    queryParams={props.queryParams}
                    numLogsAfter={numLogsAfter}
                    numLogsBefore={numLogsBefore}
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

const MemoizedDashboardContent = React.memo(DashboardContent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

