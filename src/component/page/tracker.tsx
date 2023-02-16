import MapLayer from "@/component/map/mapLayer";
import CollapsibleTable from "@/component/table/collapsibleTable";
import { DEFAULT_CURSOR } from "@/util/constant";
import { Checkbox, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";




// const getAllSatelitePaths = async (signal?: AbortSignal) => {
//   const allSateliteNames = await getAvailableSatellite(signal)
//   const sateliteInfoMap = new Array<[string, z.infer<typeof getPathValidator>]>()
//   await Promise.allSettled(allSateliteNames.slice(0, 4).map(async sateliteName => {
//     try {
//       const sateliteInfo = await getPath(sateliteName, signal)
//       sateliteInfoMap.push([sateliteName, sateliteInfo])
//     }
//     catch (e) {
//       console.error(`There was an error getting path for name=${sateliteName}`, e)
//     }
//   }))

//   if (sateliteInfoMap.length === 0) {
//     throw new Error(`Failed to retrieve any paths and/or satelites`)
//   }

//   return sateliteInfoMap
// }

const Tracker: React.FC<{}> = () => {

  const [marker, setMarker] = useState(DEFAULT_CURSOR);
  const mapDim = [1080, 600]
  const [hideSatellites, setHideSatellites] = useState(new Set<string>())
  // const { isLoading, isError, data: allSateliteArr, error } = useQuery({
  //   queryKey: ['all-satelite-paths'],
  //   queryFn: async ({ signal }) => await getAllSatelitePaths(signal),
  //   staleTime: Infinity,
  // })
  const isLoading = false;
  const isError = false;
  const allSateliteArr = [] as const;
  const filteredSatelliteArr = allSateliteArr ? allSateliteArr.filter(satelliteObj => !hideSatellites.has(satelliteObj[0])) : []
  const finalSatelliteMap = filteredSatelliteArr.length > 0 ? new Map<string, unknown>(filteredSatelliteArr) : undefined
  return (
    <Grid container className="Map View">
      <Grid item style={{ width: `calc(${mapDim[0]}px + 40px)`, paddingLeft: "20px", paddingRight: "20px" }}>
        <MapLayer
          marker={marker}
          setMarker={setMarker}
          isLoading={isLoading}
          isError={isError}
          data={finalSatelliteMap}
          style={{
            width: mapDim[0],
            height: mapDim[1],
          }}
        />
      </Grid>
      <Grid item style={{ border: '1px solid white', width: `calc(100% - ${mapDim[0]}px - 40px)` }}>
        <Container style={{ width: 'calc(100% - 20px', height: "calc(100% - 20px)", padding: '10px' }}>
          <Typography gutterBottom variant='h5'>
            Show Satellites
          </Typography>
          {allSateliteArr?.map((sateliteObj, index) =>
            <Typography key={`checkbox-${index}`}>
              <Checkbox checked={!hideSatellites.has(sateliteObj[0])} onChange={(e) => {
                const newHideSatellites = new Set<string>(hideSatellites)
                if (e.target.checked) {
                  newHideSatellites.delete(sateliteObj[0])
                }
                else {
                  newHideSatellites.add(sateliteObj[0])
                }
                setHideSatellites(newHideSatellites)
              }} />
              {sateliteObj[0]}
            </Typography>
          )}
        </Container>
      </Grid>

      <Grid item xs={12} style={{ paddingTop: '10px' }}>
        <CollapsibleTable
          marker={marker}
          setMarker={setMarker}
        />
      </Grid>
    </Grid>
  );
};

export default Tracker;
