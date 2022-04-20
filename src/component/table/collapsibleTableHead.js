import React from "react";
import {
  TableCell,
  TableRow,
} from "@mui/material";

const CollapsibleTableHead = (props) => {
  CollapsibleTableHead.prototype = {

  };

  return (
    <div className="collapsibleTableHead">
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>Satellite Name</TableCell>
      </TableRow>
    </div>
  );
};

export default CollapsibleTableHead;
