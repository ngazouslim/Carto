export interface Reference {
  id: string;
  titre: string;
  image: string;
  descriptionCourte: string;
  descriptionRich: string;
  adresse: string;
  region: string;
  telephone: string;
  latitude: number;
  longitude: number;
  autresDetails: Record<string, any>;
}

export interface TravelTime {
  duration: number;
  distance: number;
  mode: 'car' | 'walking' | 'cycling';
}

export interface MapPosition {
  lat: number;
  lng: number;
  zoom: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface FilterOptions {
  searchText: string;
  region: string;
  maxTravelTime?: number;
}