import { satellitesByOffset, satellitesByTimeRange } from '@/api/satetllite'
import { errorAtom, loadingAtom } from '@/store'
import { GenericErrorClass } from '@/util/errorHandling'
import { encodeGetParams, getQueryParamsGivenSearch } from '@/util/queryParams'
import { Grid } from '@mui/material'
import { useAtom } from 'jotai'
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
    const setLoading = useAtom(loadingAtom)[1]
    const setError = useAtom(errorAtom)[1]
    const response = useQuery({
        queryKey: [
            'satellite',
            'logs',
            props.queryParams.mode,
            props.queryParams.mode === "timeRange" ? props.queryParams.start : null,
            props.queryParams.mode === "timeRange" ? props.queryParams.end : null,
            props.queryParams.mode === "offset" ? props.queryParams.pageNo : null,
            props.queryParams.mode === "offset" ? props.queryParams.count : null
        ],
        queryFn: async () => {
            if (props.queryParams.mode === "offset") {
                return await satellitesByOffset({ pageNo: props.queryParams.pageNo, count: props.queryParams.count })
            }
            else {
                return await satellitesByTimeRange({ start: props.queryParams.start, end: props.queryParams.end })
            }
        },
        onError: (error) => {
            if (error instanceof GenericErrorClass) {
                setError(error.message)
            }
            else if (error instanceof ZodError) {
                setError("The payload received failed validation")
            }
            else if (error instanceof Error) {
                setError(error.message)
            }
            else {
                setError(`Unknown error occured: ${error}`)
            }
        },
        retry: false,
        staleTime: FIVE_MINUTES_IN_MS,
        cacheTime: 0,
        keepPreviousData: true
    })

    if (response.isFetching) {
        setLoading(true)
    }
    else {
        setLoading(false)
    }


    const logs = response.data?.logs
    const numLogsAfter = response.data?.type === "offset" ? response.data.numLogsAfter : null
    const numLogsBefore = response.data?.type === "offset" ? response.data.numLogsBefore : null
    return (
        <Grid
            container
            style={{
                paddingBottom: "16px",
                paddingRight: "16px",
                paddingLeft: "16px",
                paddingTop: "16px"
            }}
        >
            {
                logs ?

                    (
                        <React.Fragment>
                            <Grid item xs={12}>
                                <Filter
                                    queryParams={props.queryParams}
                                    numLogsAfter={numLogsAfter}
                                    numLogsBefore={numLogsBefore}
                                />
                            </Grid>
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
                    )
                    : null}
        </Grid>
    )
}

const MemoizedDashboardContent = React.memo(DashboardContent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

