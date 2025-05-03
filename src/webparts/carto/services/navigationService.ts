import { TravelTime } from '../types';

/**
 * Calculate the travel time between two points
 * In a real application, this would call a routing API like Google Directions,
 * Mapbox Directions or OpenRouteService
 */
export const calculateTravelTime = async (
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  mode: 'car' | 'walking' | 'cycling' = 'car'
): Promise<TravelTime> => {
  // This is a mock implementation
  // In a real app, we would make an API call to a routing service
  
  // Calculate direct distance in kilometers using the Haversine formula
  const R = 6371; // Earth's radius in km
  const dLat = (endLat - startLat) * Math.PI / 180;
  const dLon = (endLng - startLng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(startLat * Math.PI / 180) * Math.cos(endLat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Estimate travel time based on mode and distance
  // These are rough estimates and would be replaced by actual API responses
  let speedKmh: number;
  
  switch (mode) {
    case 'walking':
      speedKmh = 5;
      break;
    case 'cycling':
      speedKmh = 15;
      break;
    case 'car':
    default:
      speedKmh = 30; // Urban average with traffic
      break;
  }
  
  // Add some randomness to make it more realistic
  const randomFactor = 0.8 + Math.random() * 0.4; // Between 0.8 and 1.2
  const timeHours = (distance / speedKmh) * randomFactor;
  const timeMinutes = timeHours * 60;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return {
    duration: timeMinutes,
    distance: distance,
    mode: mode
  };
};

/**
 * Generate navigation links for Google Maps and Apple Maps
 */
export const generateMapLinks = (
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): { google: string; apple: string } => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}`;
  const appleMapsUrl = `http://maps.apple.com/?saddr=${startLat},${startLng}&daddr=${endLat},${endLng}`;
  
  return {
    google: googleMapsUrl,
    apple: appleMapsUrl
  };
};