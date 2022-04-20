import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from "@mui/material";
import CollapsibleTableHead from "./collapsibleTableHead";
import CollapsibleTableBody from "./collapsibleTableBody";
import { getAvailableSatellite } from "../../service/cubesatAPIService";

const CollapsibleTable = (props) => {
  CollapsibleTable.propTypes = {
    marker: PropTypes.object,
    setMarker: PropTypes.func,
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      setData(await getAvailableSatellite());
    };

    if (data.length === 0) {
      getData().then();
    }
  }, [data.length]);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <CollapsibleTableHead />
          <CollapsibleTableBody
            data={data}
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
      />
    </Paper>
  );
};

export default CollapsibleTable;
