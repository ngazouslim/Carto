import * as React from 'react';
import { useReferences } from '../../context/ReferencesContext';
import { Search, Filter } from 'lucide-react';

const SearchFilters: React.FC = () => {
  const { 
    filterOptions, 
    updateFilterOptions, 
    getRegions,
    travelTimes
  } = useReferences();
  
  const regions = getRegions();
  const hasTravelTimes = Object.keys(travelTimes).length > 0;
  
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher par nom ou adresse"
          className="input pl-10"
          value={filterOptions.searchText}
          onChange={(e) => updateFilterOptions({ searchText: e.target.value })}
        />
      </div>
      
      <details className="w-full rounded-md border border-gray-300">
        <summary className="flex cursor-pointer items-center justify-between p-2 text-sm font-medium">
          <div className="flex items-center">
            <Filter size={16} className="mr-2" />
            Filtres
          </div>
        </summary>
        
        <div className="px-4 py-3 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Région
            </label>
            <select
              className="input"
              value={filterOptions.region}
              onChange={(e) => updateFilterOptions({ region: e.target.value })}
            >
              <option value="">Toutes les régions</option>
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          
          {hasTravelTimes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temps de trajet max (minutes)
              </label>
              <select
                className="input"
                value={filterOptions.maxTravelTime || ''}
                onChange={(e) => updateFilterOptions({ 
                  maxTravelTime: e.target.value ? parseInt(e.target.value) : undefined 
                })}
              >
                <option value="">Tous les temps</option>
                <option value="10">Moins de 10 min</option>
                <option value="20">Moins de 20 min</option>
                <option value="30">Moins de 30 min</option>
                <option value="45">Moins de 45 min</option>
                <option value="60">Moins de 60 min</option>
              </select>
            </div>
          )}
        </div>
      </details>
    </div>
  );
};

export default SearchFilters;