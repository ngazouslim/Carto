import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';

interface UserLocationMarkerProps {
  position: [number, number];
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ position }) => {
  // Create custom user location icon
  const icon = divIcon({
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background-color: #3B82F6;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'user-location-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="p-1">
          <p className="text-sm font-medium">Votre position</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;