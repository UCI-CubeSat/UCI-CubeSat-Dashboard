import React from "react";
import {
  TableCell,
  TableRow,
} from "@mui/material";

const CollapsibleTableHead = (props) => {
  CollapsibleTableHead.prototype = {

  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>Satellite Name</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CollapsibleTableHead;
