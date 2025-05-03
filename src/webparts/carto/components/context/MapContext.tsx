import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MapPosition, MapBounds } from '../../types';

interface MapContextType {
  center: MapPosition;
  userLocation: { lat: number; lng: number } | null;
  mapBounds: MapBounds | null;
  setCenter: (center: MapPosition) => void;
  setMapBounds: (bounds: MapBounds) => void;
  getUserLocation: () => Promise<void>;
}

const defaultCenter: MapPosition = { lat: 48.8566, lng: 2.3522, zoom: 13 }; // Paris by default

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [center, setCenter] = useState<MapPosition>(defaultCenter);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);

  const getUserLocation = async (): Promise<void> => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000, // Increased timeout to 15 seconds
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setCenter({ lat: latitude, lng: longitude, zoom: 13 });
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  };
  const getUserLocation2 = async (): Promise<GeolocationCoordinates | null> => {
    let res: GeolocationCoordinates | null = null;
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000, // Increased timeout to 15 seconds
            maximumAge: 0
          });
        });
  
        //const { latitude, longitude } = position.coords;
        res = position.coords;
        
      } catch (error) {
        console.error('Error getting location:', error);
        
      }
    }
    return res;
  }


  // Try to get user location on component mount
  useEffect(() => {
    // eslint-disable-next-line no-void, @typescript-eslint/no-floating-promises
    getUserLocation2().then((position) => {
      if (position) {
        const { latitude, longitude } = position;
        setUserLocation({ lat: latitude, lng: longitude });
        setCenter({ lat: latitude, lng: longitude, zoom: 13 });
      }
    });

  }, []);

  return (
    <MapContext.Provider
      value={{
        
        center,
        userLocation,
        mapBounds,
        setCenter,
        setMapBounds,
        getUserLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};