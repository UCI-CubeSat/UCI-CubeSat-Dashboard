import { React, useState } from "react";
import MapLayer from "../map/mapLayer";
import { DEFAULT_CURSOR } from "../../util/constant";
import CollapsibleTable from "../table/collapsibleTable";
import SatelliteLayer from "../map/satelliteLayer";

const Tracker = (props) => {
  Tracker.propTypes = {

  };

  const [marker, setMarker] = useState(DEFAULT_CURSOR);

  return (
    <div className="Map View">
      {/* <MapLayer
        marker={marker}
        setMarker={setMarker}
      /> */}
      <SatelliteLayer/>

      <CollapsibleTable
        marker={marker}
        setMarker={setMarker}
      />
    </div>
  );
};

export default Tracker;
