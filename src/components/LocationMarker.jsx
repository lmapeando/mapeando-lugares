import React,{useState,useEffect} from "react";
import { Marker,Popup,useMap,useMapEvents} from 'react-leaflet'

export default function LocationMarker({ onPositionChange }) {
    const [position, setPosition] = useState(null);
  const map = useMap();

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onPositionChange(e.latlng); // Llama a la función de devolución de llamada para enviar la posición al componente padre
    }
  });

  useEffect(() => {
    // Cuando la posición cambie, notifica al componente padre
    if (position) {
      onPositionChange(position);
    }
  }, [position, onPositionChange]);
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  