import React from "react";
import {
  TableBody
} from "@mui/material";
import PropTypes from "prop-types";
import _ from "lodash";
import CollapsibleTableRow from "./collapsibleTableRow";

export const DataContext = React.createContext({
  arr: PropTypes.array,
  index: PropTypes.number,
});

const CollapsibleTableBody = (props) => {
  CollapsibleTableBody.propTypes = {
    data: PropTypes.array,
    marker: PropTypes.object,
    setMarker: PropTypes.func,
  };

  return (
    <React.Fragment>
      <TableBody sx={{bgcolor: "#3A3B3C"}}>
        {_.map(_.range(props.data.length), (index) => (
          <DataContext.Provider value={{arr: props.data, index: index}}>
            <CollapsibleTableRow
              marker={props.marker}
              setMarker={props.setMarker}
            />
          </DataContext.Provider>
        ))}
      </TableBody>
    </React.Fragment>
  );
};

export default CollapsibleTableBody;
