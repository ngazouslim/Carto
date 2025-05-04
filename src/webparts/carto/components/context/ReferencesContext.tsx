import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { Reference, FilterOptions, TravelTime } from '../../types';
//import mockReferences from '../../data/mockReferences';
import { useMap } from './MapContext';
import { calculateTravelTime, generateMapLinks } from '../../services/navigationService';

interface ReferencesContextType {
  references: Reference[];
  filteredReferences: Reference[];
  highlightedReference: Reference | null;
  selectedReference: Reference | null;
  travelTimes: Record<string, TravelTime>;
  navigationLinks: Record<string, { google: string; apple: string }>;
  filterOptions: FilterOptions;
  setHighlightedReference: (reference: Reference | null) => void;
  setSelectedReference: (reference: Reference | null) => void;
  updateFilterOptions: (options: Partial<FilterOptions>) => void;
  getRegions: () => string[];
  getTypes: () => string[];
}

const ReferencesContext = createContext<ReferencesContextType | undefined>(undefined);

export const ReferencesProvider: React.FC<{ initialReferences: Reference[] }> = ({ initialReferences, children  }) => {
  const [references] = useState<Reference[]>(initialReferences);
  const [highlightedReference, setHighlightedReference] = useState<Reference | null>(null);
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);
  const [filteredReferences, setFilteredReferences] = useState<Reference[]>(references);
  const [travelTimes, setTravelTimes] = useState<Record<string, TravelTime>>({});
  const [navigationLinks, setNavigationLinks] = useState<Record<string, { google: string; apple: string }>>({});
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchText: '',
    region: '',
    types: [],
  });

  const { userLocation, mapBounds } = useMap();

  // Apply filters when filterOptions or mapBounds change
  useEffect(() => {
    let results = references;
    
    // Filter by search text
    if (filterOptions.searchText) {
      const searchLower = filterOptions.searchText.toLowerCase();
      results = results.filter(
        ref => 
          ref.titre.toLowerCase().indexOf(searchLower) !== -1 || 
          ref.descriptionCourte.toLowerCase().indexOf(searchLower) !== -1 ||
          ref.adresse.toLowerCase().indexOf(searchLower) !== -1
      );
    }
    
    // Filter by region
    if (filterOptions.region) {
      results = results.filter(ref => ref.region === filterOptions.region);
    }
    
    // Filter by types

    if (filterOptions.types.length > 0) {

      results = results.filter(ref => 
        //filterOptions.types.includes(ref.autresDetails.typeEtablissement.toString())
        filterOptions.types.indexOf(ref.autresDetails.typeEtablissement.toString()) !== -1
      );

    }
    // Filter by travel time if available
    if (filterOptions.maxTravelTime && Object.keys(travelTimes).length > 0) {
      results = results.filter(
        ref => {
          const time = travelTimes[ref.id];
          return time && time.duration <= filterOptions.maxTravelTime!;
        }
      );
    }
    
    // Filter by map bounds
    if (mapBounds) {
      results = results.filter(
        ref => 
          ref.latitude <= mapBounds.north &&
          ref.latitude >= mapBounds.south &&
          ref.longitude <= mapBounds.east &&
          ref.longitude >= mapBounds.west
      );
    }
    
    setFilteredReferences(results);
  }, [references, filterOptions, mapBounds, travelTimes]);

  // Calculate travel times when userLocation changes
  useEffect(() => {
    if (!userLocation) return;

    const calculateAllTravelTimes = async () => {
      const times: Record<string, TravelTime> = {};
      const links: Record<string, { google: string; apple: string }> = {};

      // Calculate for each reference
      for (const ref of references) {
        times[ref.id] = await calculateTravelTime(
          userLocation.lat,
          userLocation.lng,
          ref.latitude,
          ref.longitude
        );
        
        links[ref.id] = generateMapLinks(
          userLocation.lat,
          userLocation.lng,
          ref.latitude,
          ref.longitude
        );
      }

      setTravelTimes(times);
      setNavigationLinks(links);
    };

    // to check for async methods
    // eslint-disable-next-line no-void
    void calculateAllTravelTimes();
  }, [userLocation, references]);

  const updateFilterOptions = (options: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...options }));
  };

  const getRegions = (): string[] => {
    const regions = new Set(references.map(ref => ref.region));
    // Convert Set to Array
    const regionsArray: string[] = []; // Initialize an empty array

    regions.forEach(region => {
      regionsArray.push(region); // Add each region to the array
    });
    return regionsArray;
    //return Array.prototype.slice.call(regions);
  };

  const getTypes = (): string[] => {
    const types = new Set(references.map(ref => ref.autresDetails.typeEtablissement));
    const typesArray: string[] = []; // Initialize an empty array
    types.forEach(type => {
      typesArray.push(type); // Add each type to the array
    });
    return typesArray;
    //return Array.from(types);
  };

  return (
    <ReferencesContext.Provider
      value={{
        references,
        filteredReferences,
        highlightedReference,
        selectedReference,
        travelTimes,
        navigationLinks,
        filterOptions,
        setHighlightedReference,
        setSelectedReference,
        updateFilterOptions,
        getRegions,
        getTypes,
      }}
    >
      {children}
    </ReferencesContext.Provider>
  );
};

export const useReferences = (): ReferencesContextType => {
  const context = useContext(ReferencesContext);
  if (context === undefined) {
    throw new Error('useReferences must be used within a ReferencesProvider');
  }
  return context;
};