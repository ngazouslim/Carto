import * as React from 'react';
import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useReferences } from '../../context/ReferencesContext';
import { Reference } from '../../../types';
import { MapPin } from 'lucide-react';

interface CustomMarkerProps {
  reference: Reference;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ reference }: CustomMarkerProps) => {
  const { 
    highlightedReference, 
    setHighlightedReference, 
    setSelectedReference,
    travelTimes
  } = useReferences();
  
  const isHighlighted = highlightedReference?.id === reference.id;

  // Create custom icon
  const icon = useMemo(() => {
    const html = `
      <div class="custom-pin ${isHighlighted ? 'highlighted' : ''}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${isHighlighted ? '#F97316' : '#3B82F6'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `;
    
    return divIcon({
      html,
      className: 'custom-marker-icon',
      iconSize: [36, 36],
      iconAnchor: [18, 36]
    });
  }, [isHighlighted]);

  // Get travel time for this reference if available
  const travelTime = travelTimes[reference.id];
  
  const handleMarkerMouseOver = () => {
    setHighlightedReference(reference);
  };
  
  const handleMarkerMouseOut = () => {
    setHighlightedReference(null);
  };
  
  // const handleMarkerClick = () => {
  //   setSelectedReference(reference);
  // };

  return (
    <Marker
      position={[reference.latitude, reference.longitude]}
      icon={icon}
      eventHandlers={{
        mouseover: handleMarkerMouseOver,
        mouseout: handleMarkerMouseOut,
        //click: handleMarkerClick
      }}
    >
      <Popup className="pin-tooltip">
        <div className="flex flex-col">
          <div className="w-full h-24 bg-gray-200 rounded-t-lg overflow-hidden">
            <img 
              src={reference.image} 
              alt={reference.titre} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2">
            <h3 className="font-semibold text-base">{reference.titre}</h3>
            <p className="text-sm text-gray-700 line-clamp-2">{reference.descriptionCourte}</p>
            {travelTime && (
              <p className="text-xs text-blue-600 mt-1 flex items-center">
                <span className="mr-1">
                  <MapPin size={12} />
                </span>
                {Math.round(travelTime.duration)} min en voiture
              </p>
            )}
            <button 
              className="mt-2 w-full text-sm btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedReference(reference);
              }}
            >
              Voir détails
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;