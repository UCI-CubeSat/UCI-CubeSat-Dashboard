import React from "react";
import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";

const DataTable = (props) => {
  DataTable.propTypes = {
    data: PropTypes.object,
    label: PropTypes.string,
    columnText: PropTypes.array.text,
  };

  return (
    <div className="DataTable">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label={props.label}>
          <TableHead>
            <TableRow>
              {
                _.map(props.columnText, (text) => (
                  <TableCell align="left">{text}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(props.data, (value, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {moment(key).format("MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
                <TableCell align="left">
                  {moment(`${JSON.parse(value)["rise"]}+00:00`).format(
                      "MMMM Do YYYY, h:mm:ss a"
                  )}
                </TableCell>
                <TableCell align="left">
                  {moment(`${JSON.parse(value)["set"]}+00:00`).format(
                      "MMMM Do YYYY, h:mm:ss a"
                  )}
                </TableCell>
                <TableCell align="left">
                  {JSON.parse(value)["duration"]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
