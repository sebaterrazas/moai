"use client";

import { useRef, useState, useEffect } from 'react';

import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdAirplane } from "react-icons/io";

import { MapPhoto } from './MapPhoto';

import classes from "./Map.module.css";

export const MapComponent = ({ gallery }: { gallery: any[] }) => {

  const mapRef = useRef(null);

  const [zoom, setZoom] = useState(2);
  const [rotationList, setRotationList] = useState<number[]>([]);

  useEffect(() => {
    // Generate an array of random rotation values for each item in the gallery
    const rotations = gallery.map(() => Math.floor(Math.random() * 21) - 10);
    setRotationList(rotations);
  }, [gallery]); 

  /* 	const [selectedMarker, setSelectedMarker] = useState(null);
	const mapRef = useRef(null);

	const zoomToSelectedLoc = (e, airport, index) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();
		setSelectedMarker({ airport, index });
		mapRef.current.flyTo({ center: [airport.lon, airport.lat], zoom: 10 });
	}; */

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
        onZoom={(e) => { setZoom(e.viewState.zoom); }}
      >
        <GeolocateControl position="bottom-left" />
        {/* <NavigationControl position="top-left" /> */}
        {gallery.map((item, index) => {
          return (
            <Marker key={index} longitude={item.lon} latitude={item.lat}>
              <button
                type="button"
                className="cursor-pointer"
                // onClick={(e) => zoomToSelectedLoc(e, item, index)}
              >
                {<MapPhoto media={item} zoom={zoom} rotation={rotationList[index]}/>}
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