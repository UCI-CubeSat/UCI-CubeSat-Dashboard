import React from "react";
import {
  TableCell,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";

const CollapsibleTableHead = (props) => {
  CollapsibleTableHead.prototype = {

  };

  return (
    <React.Fragment>
      <Box>
        <TableRow sx={{ "& > *": { borderBottom: "unset" }, "color": "white" }}>
          <TableCell>Satellite Name</TableCell>
        </TableRow>
      </Box>
    </React.Fragment>
  );
};

export default CollapsibleTableHead;
