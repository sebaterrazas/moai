import React from 'react';
import { LayerProps, Layer, Marker, Source } from 'react-map-gl';
import { MapPhoto } from './MapPhoto';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'polaroids',
  filter: ['>', 'point_count', 1],
  paint: {
    'circle-color': '#51bbd6', 
    'circle-radius': 20,
  }
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'polaroids',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'polaroids',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

/* interface UnclusteredPointLayerProps {
  gallery: any[];
  zoom: number;
  rotationList: number[];
}

export const unclusteredPointLayer = ({ gallery, zoom, rotationList }: UnclusteredPointLayerProps): JSX.Element => {
  return (
    <Source
      id="polaroids"
      type="geojson"
      data={{
        type: 'FeatureCollection',
        features: gallery.map((item, index) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [item.lon, item.lat] },
          properties: { index },
        })),
      }}
    >
      <Layer
        id="unclustered-point"
        type="symbol"
        layout={{ 'icon-image': 'custom-marker', 'icon-size': 1.0 }}
      />
      {gallery.map((item, index) => (
        <Marker key={index} longitude={item.lon} latitude={item.lat}>
          <button type="button" className="cursor-pointer">
            <MapPhoto media={item} zoom={zoom} rotation={rotationList[index]} />
          </button>
        </Marker>
      ))}
    </Source>
  );
}; */

