"use client";

import { useRef, useState, useEffect, useContext } from 'react';

import Map, { Source, Layer, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type {FeatureCollection} from 'geojson';
import type {Point} from 'geojson';
import type {Feature} from 'geojson';
import type {GeoJsonProperties} from 'geojson';

import { MapPhoto } from './MapPhoto';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';

import classes from "./Map.module.css";
import { MainContext } from '../MainView';

export default ({ setIsLoading }: { setIsLoading: Function }) => {

  const mainContext = useContext(MainContext);

  const gallery = mainContext.gallery;
  const bounds = mainContext.boundaries;

  const mapRef = useRef<any>(null);

  const [zoom, setZoom] = useState(2);
  const [rotationList, setRotationList] = useState<number[]>([]);

  useEffect(() => {
    // Generate an array of random rotation values for each item in the gallery
    const rotations = gallery.map(() => Math.floor(Math.random() * 21) - 10);
    setRotationList(rotations);
  }, [gallery]); 

  useEffect(() => {
    if (mapRef.current && bounds.length > 0) {
      mapRef.current.fitBounds(bounds, {
        padding: {top: 10, bottom: 25, left: 15, right: 5}
      });
    }
  }, [bounds]);

/*   const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null; */

/*   const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  }); */

  /* 	const [selectedMarker, setSelectedMarker] = useState(null);
	const mapRef = useRef(null);

	const zoomToSelectedLoc = (e, airport, index) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();
		setSelectedMarker({ airport, index });
		mapRef.current.flyTo({ center: [airport.lon, airport.lat], zoom: 10 });
	}; */

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  interface InitialViewState {
    bounds?: [number, number, number, number];
    longitude?: number;
    latitude?: number;
    zoom?: number;
  }

  const initialViewState: InitialViewState = bounds.length > 0 ? { 
    bounds: [bounds[2], bounds[1], bounds[0], bounds[3]],
  } : { 
    longitude: -70, latitude: -10, zoom: 2 
  };

  return (
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/sebaterrazas/cls4qvp23027v01p562pf6pch"
        style={{ height: "100dvh" }}
        initialViewState={initialViewState}
        maxZoom={20}
        minZoom={1}
        reuseMaps
        onZoom={(e) => { setZoom(e.viewState.zoom); }}
        onLoad={(e) => { setZoom(e.target.transform.tileZoom); setIsLoading(false); }} // Si existe
      >
        <GeolocateControl position="bottom-right" />
        {/* <Source
          id="polaroids"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={2}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source> */}
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
}