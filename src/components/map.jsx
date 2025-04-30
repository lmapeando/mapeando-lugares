import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import LocationMarker from './LocationMarker';

export default function Map({PositionChange}) {
  const center = [4.6097, -74.0817];

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onPositionChange={PositionChange} /> 
      </MapContainer>
    </>
  );
}