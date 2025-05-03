import * as React from 'react';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useReferences } from '../../context/ReferencesContext';
import { useMap as useMapContext } from '../../context/MapContext';
import CustomMarker from './CustomMarker';
import UserLocationMarker from './UserLocationMarker';
import 'leaflet/dist/leaflet.css';

const MapController: React.FC = () => {
  const { center, setMapBounds } = useMapContext();
  const map = useMap();
  
  // Update map center when context center changes
  useEffect(() => {
    map.setView([center.lat, center.lng], center.zoom);
  }, [center, map]);
  
  // Track map bounds for filtering references
  useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      setMapBounds({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      });
    }
  });
  
  return null;
};

const MapView: React.FC = () => {
  const { filteredReferences } = useReferences();
  const { center, userLocation } = useMapContext();

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={center.zoom}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {userLocation && (
        <UserLocationMarker position={[userLocation.lat, userLocation.lng]} />
      )}
      
      {filteredReferences.map((reference:any) => (
        <CustomMarker
          key={reference.id}
          reference={reference}
        />
      ))}
      
      <MapController />
    </MapContainer>
  );
};

export default MapView;