import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';


type BaseHeader = {
    [key: string]: {
        title: string,
        transform?: (value: number | string | null) => string
    };
};

type Props<T extends BaseHeader> = {
    tableHeaders: T,
    data: Array<Record<keyof T, string | number | null>>
    id: string,
    style?: React.CSSProperties
}

const getKeysOfObject = <T extends BaseHeader>(obj: T) => {
    return Object.keys(obj) as Array<keyof T>
}

export default function TableComp<T extends BaseHeader>(props: Props<T>) {
    const { tableHeaders, data, id, style } = props
    const [page, setPage] = useState(0);
    const [pageLimit, setPageLimit] = useState(10)
    const keys = getKeysOfObject(tableHeaders)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    useEffect(() => {
        setPage(0)
    }, [data])

    return (
        <TableContainer component={Paper} style={style}>
            <Table >
                <TableHead>
                    <TableRow>
                        {keys.map((key, index) => (
                            <TableCell key={`${id}-${index}-header`}>
                                <b>{tableHeaders[key].title}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody >
                    {(pageLimit !== undefined && pageLimit > 0
                        ? data.slice(page * pageLimit, page * pageLimit + pageLimit)
                        : data
                    ).map((entry, index) => (
                        <TableRow key={`${id}-${index}-body`}>
                            {keys.map(key => (
                                <TableCell key={`${id}-${index}-body-${String(key)}`} >
                                    {tableHeaders[key].transform?.(entry[key]) ?? entry[key]}
                                </TableCell>
                            ))}

                        </TableRow>
                    ))}
                </TableBody >
                {pageLimit ?
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={data.length}
                                rowsPerPage={pageLimit}
                                onRowsPerPageChange={(event) => {
                                    setPage(0)
                                    setPageLimit(Number(event.target.value))
                                }}
                                page={page}
                                onPageChange={handleChangePage}
                            />
                        </TableRow>
                    </TableFooter>
                    : null}
            </Table>
        </TableContainer>
    )
}



