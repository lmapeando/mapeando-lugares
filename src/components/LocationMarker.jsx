import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function LocationMarker({ onPositionChange }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("La geolocalización no está soportada por tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setPosition(latlng);
        map.setView(latlng, 13); // Centra el mapa en la posición actual
        onPositionChange(latlng); // Informa al componente padre
      },
      (err) => {
        console.error("Error obteniendo la ubicación:", err.message);
        alert("No se pudo obtener tu ubicación.");
      }
    );
  }, [map, onPositionChange]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>¡Estás aquí!</Popup>
    </Marker>
  );
}
