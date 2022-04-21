import {
  Box,
  Collapse,
  IconButton,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { DataContext } from "./collapsibleTableBody";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getPrediction } from "../../service/cubesatAPIService";
import _ from "lodash";
import { DEFAULT_CURSOR } from "../../util/constant";
import PropTypes from "prop-types";
// import moment from "moment";

const CollapsibleTableRow = (props) => {
  CollapsibleTableRow.propTypes = {
    marker: PropTypes.object,
    setMarker: PropTypes.func,
  };

  const [open, setOpen] = React.useState(false);
  const [prediction, setPrediction] = React.useState({});
  const dataContext = useContext(DataContext);

  useEffect(() => {
    const onExpand = async() => {
      setPrediction(await getPrediction(
          {
            lat: _.get(props.marker, "lat", DEFAULT_CURSOR.lat),
            lng: _.get(props.marker, "lng", DEFAULT_CURSOR.lng),
          },
          dataContext.arr[dataContext.index]
      ));
    };

    if (open) {
      onExpand().then();
    }
  }, [open, props.marker, dataContext.arr, dataContext.index]);

  return (
    <React.Fragment>

      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left">
            {open ? "Detail Information" : dataContext.arr[dataContext.index]}
          </TableCell>
        </TableRow>
      </React.Fragment>

      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {`Prediction:
                  ${dataContext.arr[dataContext.index]}
                  for the next 24 hours`}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Peak</TableCell>
                      <TableCell>Rise</TableCell>
                      <TableCell>Set</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {_.map(prediction, (value, key) => (
                      <TableRow
                        key={key}
                        sx={{ "& > *": { borderBottom: "unset" } }}>
                        <TableCell align="left">
                          {key}
                        </TableCell>
                        <TableCell align="left">
                          {value["rise"]}
                        </TableCell>
                        <TableCell align="left">
                          {value["set"]}
                        </TableCell>
                        <TableCell align="left">
                          {value["duration"]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </React.Fragment>
  );
};

export default CollapsibleTableRow;
