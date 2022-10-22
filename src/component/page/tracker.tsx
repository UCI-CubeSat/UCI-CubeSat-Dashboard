import React, { useState } from "react";
import MapLayer from "@/component/map/mapLayer";
import { DEFAULT_CURSOR } from "@/util/constant";
import CollapsibleTable from "@/component/table/collapsibleTable";

const Tracker: React.FC<{}> = () => {

  const [marker, setMarker] = useState(DEFAULT_CURSOR);

  return (
    <div className="Map View">
      <MapLayer
        marker={marker}
        setMarker={setMarker}
      />
      <br />
      <CollapsibleTable
        marker={marker}
        setMarker={setMarker}
      />
    </div>
  );
};

export default Tracker;
