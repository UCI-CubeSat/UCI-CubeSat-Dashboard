import { getAvailableSatellite } from "@/service/cubesatAPIService";
import { getAvailableSatelliteResponse, ParsedLog } from "@/service/cubsesatAPIService.validators";
import type { LatLng } from '@/util/general.types';
import {
  Paper,
  Table,
  TableContainer,
  TablePagination
} from "@mui/material";
import React, { useEffect } from "react";
import CollapsibleTableBody from "./collapsibleTableBody";
import CollapsibleTableHead from "./collapsibleTableHead";



type Props = {
  marker: LatLng,
  setMarker: (arg0: LatLng) => void
}

const CollapsibleTable: React.FC<Props> = (props) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [data, setData] = React.useState<getAvailableSatelliteResponse>([]);
  const [data, setData] = React.useState<ParsedLog>([]);

  useEffect(() => {
    const getData = async () => {
      setData(await getAvailableSatellite());
    };

    if (data.length === 0) {
      getData().then();
    }
  }, [data.length]);

  return (
    <Paper sx={{ width: "100%", bgcolor: "#18191A" }}>
      <TableContainer component={Paper} sx={{ bgcolor: "#18191A" }}>
        <Table aria-label="collapsible table">
          <CollapsibleTableHead />
          <CollapsibleTableBody
            data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            marker={props.marker}
            setMarker={props.setMarker}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
        sx={{ color: "white" }}
      />
    </Paper>
  );
};

export default CollapsibleTable;
