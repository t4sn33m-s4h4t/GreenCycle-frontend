import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map= () => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
 
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="&copy; ESRI & contributors"
      /> 
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Natural_Earth/NE1_HR_LC/MapServer/tile/{z}/{y}/{x}"
        attribution="&copy; ESRI"
        opacity={0.6}
      />
    </MapContainer>
  );
};

export default Map
;
