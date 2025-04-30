import React, { useState, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function LocationMarker({ onPositionChange }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      onPositionChange(e.latlng); // Informa al componente padre sobre la selección del usuario
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Ubicación seleccionada</Popup>
    </Marker>
  );
}