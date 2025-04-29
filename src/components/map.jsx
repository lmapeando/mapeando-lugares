import React,{useEffect, useState} from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import LocationMarker from './LocationMarker';




// function LocationMarker() {
//     const [position, setPosition] = useState(null)
//     const map = useMap(); // Obtener la referencia al mapa
//     useMapEvents({
//       click(e) {
//        console.log(e.latlng);
//        setPosition(e.latlng)
//       }     
//     })
  
//     return position === null ? null : (
//       <Marker position={position}>
//         <Popup>You are here</Popup>
//       </Marker>
//     )
//   }
  

// export default function map() {
//     const center = [4.6097, -74.0817]; 
//     const [markers, setMarkers] = useState([]); // Estado para los marcadores
    

//   return (
//     <div className="mapita" >
//         <MapContainer
//         center={center}
//         zoom={13}
//         style={{ height: '400px', width: '50%' }}
//          // Agrega el manejador de clic al mapa
//         >
//         <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//             <LocationMarker />
//         </MapContainer>
//     </div>
//   )
// }


// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

// function LocationMarker({ onPositionChange }) {
//   const [position, setPosition] = useState(null);
//   const map = useMap();

//   useMapEvents({
//     click(e) {
//       console.log(e.latlng);
//       setPosition(e.latlng);
//       onPositionChange(e.latlng); // Llama a la función de devolución de llamada para enviar la posición al componente padre
//     }
//   });

//   useEffect(() => {
//     // Cuando la posición cambie, notifica al componente padre
//     if (position) {
//       onPositionChange(position);
//     }
//   }, [position, onPositionChange]);

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

export default function Map({PositionChange}) {
  const center = [4.6097, -74.0817];
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState(null);

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  useEffect(() => {
    // Cuando la posición cambie, notifica al componente padre
    if (position) {
      PositionChange(position);
    }
  }, [position, PositionChange]);



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
        <LocationMarker onPositionChange={handlePositionChange} />
      </MapContainer>
    </>
  );
}
