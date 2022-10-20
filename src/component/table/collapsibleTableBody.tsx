import { getAvailableSatelliteResponse } from "@/service/cubsesatAPIService.validators";
import { LatLng } from "@/util/general.types";
import {
  TableBody
} from "@mui/material";
import _ from "lodash";
import React from "react";
import CollapsibleTableRow from "./collapsibleTableRow";

export const DataContext = React.createContext<{ arr: getAvailableSatelliteResponse, index?: number }>({
  arr: [],
  index: undefined
});

type Props = {
  data: getAvailableSatelliteResponse,
  marker: LatLng,
  setMarker: (arg0: LatLng) => void
}

const CollapsibleTableBody: React.FC<Props> = (props) => {

  return (
    <React.Fragment>
      <TableBody sx={{ bgcolor: "#3A3B3C" }}>
        {_.map(_.range(props.data.length), (index) => (
          <DataContext.Provider value={{ arr: props.data, index: index }}>
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
