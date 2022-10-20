import {
  TableCell,
  TableRow
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";


const CollapsibleTableHead: React.FC<{}> = () => {
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
