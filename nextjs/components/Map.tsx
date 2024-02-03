"use client";

import { useRef } from 'react';

import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdAirplane } from "react-icons/io";

/* import classes from "./Map.module.css";
import { getMedia } from '@/lib/actions' */

export const MapComponent = ({ query }: { query: string }) => {

  // const { medias } = await getMedia(query)
  console.log(query)
  const mapRef = useRef(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  return (
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/sebaterrazas/cls4qvp23027v01p562pf6pch"
        style={{ height: "100dvh" }}
        initialViewState={{ longitude: -70, latitude: -10, zoom: 2 }}
        maxZoom={20}
        minZoom={1}
        reuseMaps
      >
        <GeolocateControl position="bottom-left" />
        {/* <NavigationControl position="top-left" /> */}
        {[{ 'lon': 35.66, 'lat': 39.75 }].map((airport, index) => {
          return (
            <Marker key={index} longitude={airport.lon} latitude={airport.lat}>
              <button
                type="button"
                className="cursor-pointer"
                // onClick={(e) => zoomToSelectedLoc(e, airport, index)}
              >
                {<IoMdAirplane size={30} color="tomato" />}
              </button>
            </Marker>
          );
        })}
      </Map>
  )
  // return (
  //   <pre>{JSON.stringify(await getMedia(query), null, 2)}</pre>  
  // )

//   return (
//     <>
//       {medias.length < 1 ? (
//         <article className="grid place-items-center">
//           <p>The Case of Missing Data</p>
//         </article>
//       ) : (
//         <article>
//           {/** @ts-expect-error Server Component */}
//           <MediasList medias={medias} />
//         </article>
//       )}
//     </>
//   )
}