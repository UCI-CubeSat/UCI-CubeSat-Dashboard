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
    <div className="collapsibleTableBody">
      <TableBody>
        {_.map(_.range(props.data.length), (index) => (
          <DataContext.Provider value={{arr: props.data, index: index}}>
            <CollapsibleTableRow
              marker={props.marker}
              setMarker={props.setMarker}
            />
          </DataContext.Provider>
        ))}
      </TableBody>
    </div>
  );
};

export default CollapsibleTableBody;
