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
        <TableRow sx={{ "& > *": { borderBottom: "unset" },
          "bgcolor": "#242526", "color": "white"}}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              sx={{color: "white"}}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left" sx={{bgcolor: "#242526", color: "white"}}>
            {open ? "Detail Information" : dataContext.arr[dataContext.index]}
          </TableCell>
        </TableRow>
      </React.Fragment>

      <React.Fragment>
        <TableRow sx={{ "bgcolor": "#242526",
          "& > *": { borderBottom: "unset" } }}>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div"
                  sx={{ color: "white" }}>
                  {`Prediction:
                  ${dataContext.arr[dataContext.index]}
                  for the next 24 hours`}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Peak</TableCell>
                      <TableCell sx={{ color: "white" }}>Rise</TableCell>
                      <TableCell sx={{ color: "white" }}>Set</TableCell>
                      <TableCell sx={{ color: "white" }}>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {_.map(prediction, (value, key) => (
                      <TableRow
                        key={key}
                        sx={{ "& > *": { borderBottom: "unset" } }}>
                        <TableCell align="left" sx={{ color: "white" }}>
                          {key}
                        </TableCell>
                        <TableCell align="left" sx={{ color: "white" }}>
                          {value["rise"]}
                        </TableCell>
                        <TableCell align="left" sx={{ color: "white" }}>
                          {value["set"]}
                        </TableCell>
                        <TableCell align="left" sx={{ color: "white" }}>
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
