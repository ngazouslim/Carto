import * as React from 'react';
import { useReferences } from '../../context/ReferencesContext';
import { Search, Filter, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const SearchFilters: React.FC = () => {
  const { 
    filterOptions, 
    updateFilterOptions, 
    getRegions,
    getTypes,
    travelTimes
  } = useReferences();
  
  const regions = getRegions();
  const types = getTypes();
  const hasTravelTimes = Object.keys(travelTimes).length > 0;
  
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [typeSearchText, setTypeSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTypes = types.filter(type => 
    type.toLowerCase().indexOf(typeSearchText.toLowerCase()) !== -1
  );

  const handleTypeSelect = (type: string) => {
      const newTypes = filterOptions.types.indexOf(type) !== -1
        ? filterOptions.types.filter(t => t !== type)
        : [...filterOptions.types, type];
      updateFilterOptions({ types: newTypes });
  };

  const handleRemoveType = (type: string) => {
    updateFilterOptions({
      types: filterOptions.types.filter(t => t !== type)
    });
  };


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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Types d'établissement
            </label>
            <div className="relative" ref={dropdownRef}>
              <div 
                className="input min-h-[42px] cursor-text flex flex-wrap gap-1 p-1"
                onClick={() => {
                  setIsTypeDropdownOpen(true);
                  inputRef.current?.focus();
                }}
              >
                {filterOptions.types.map(type => (
                  <span 
                    key={type}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {type}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveType(type);
                      }}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  className="outline-none flex-1 min-w-[60px]"
                  value={typeSearchText}
                  onChange={(e) => setTypeSearchText(e.target.value)}
                  onFocus={() => setIsTypeDropdownOpen(true)}
                  placeholder={filterOptions.types.length === 0 ? "Sélectionner des types..." : ""}
                />
              </div>
              
              {isTypeDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredTypes.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">
                      Aucun résultat
                    </div>
                  ) : (
                    filteredTypes.map(type => (
                      <div
                        key={type}
                        className={`
                          p-2 cursor-pointer text-sm hover:bg-blue-50
                          ${filterOptions.types.indexOf(type) !== -1 ? 'bg-blue-50' : ''}
                        `}
                        onClick={() => handleTypeSelect(type)}
                      >
                        {type}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
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