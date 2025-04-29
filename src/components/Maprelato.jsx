import React from 'react'
import { MapContainer, TileLayer,Marker,Popup} from 'react-leaflet';


export default function Maprelato({ubi}) {
    const center = [ubi.lat, ubi.lng];
    console.log(ubi);
  return (
    <>
    <MapContainer
        center={center}
        zoom={13}
        style={{ height: '420px', width: '420px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
            <Popup>
                Ubicacion
            </Popup>
            </Marker>
      </MapContainer>
    </>
  )
}
