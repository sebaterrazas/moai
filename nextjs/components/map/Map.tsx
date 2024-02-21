"use client";

import { useRef, useState, useEffect } from 'react';

import Map, { Source, Layer, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type {FeatureCollection} from 'geojson';
import type {Point} from 'geojson';
import type {Feature} from 'geojson';
import type {GeoJsonProperties} from 'geojson';

import { MapPhoto } from './MapPhoto';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';

import classes from "./Map.module.css";

const geojson: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [],
};

export default ({ gallery, bounds, setIsLoading }: { gallery: any[], bounds: number[] | null, setIsLoading: Function }) => {

  /* const [viewport, setViewport] = useState({
    latitude: 52.6376,
    longitude: -1.135171,
    width: "100vw",
    height: "100vh",
    zoom: 12
  }); */

  const mapRef = useRef<any>(null);

  const [zoom, setZoom] = useState(2);
  const [rotationList, setRotationList] = useState<number[]>([]);

  /* useEffect(() => {
    if (rotationList.length > 0 && geojson.features.length == 0) {
      gallery.forEach((item, index) => {
        const longitude = item.lon;
        const latitude = item.lat;   
        // Create a new feature and add it to the features array
        const feature: Feature<Point, GeoJsonProperties> = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          properties: {
            index,
            media: item,
            cluster: false,
          },
        };
        geojson.features.push(feature);
      });
    }
  }, [gallery]); */

  useEffect(() => {
    // Generate an array of random rotation values for each item in the gallery
    const rotations = gallery.map(() => Math.floor(Math.random() * 21) - 10);
    setRotationList(rotations);
  }, [gallery]); 

  useEffect(() => {
    if (mapRef.current && bounds?.length) {
      mapRef.current.fitBounds(bounds, {
        padding: {top: 10, bottom:25, left: 15, right: 5}
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
        onLoad={() => setIsLoading(false)}
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