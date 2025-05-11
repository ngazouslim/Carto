import * as React from 'react';
import { useReferences } from '../../context/ReferencesContext';
import SearchFilters from './SearchFilters';
import ReferenceList from './ReferenceList';
import { useMap } from '../../context/MapContext';
import { MapPin, Compass } from 'lucide-react';
import * as strings from 'CartoWebPartStrings';

const Sidebar: React.FC = () => {
  const { filteredReferences } = useReferences();
  const { getUserLocation, userLocation } = useMap();

  return (
    <div className="h-screen w-96 bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold mb-2">Explorer les références</h1>
        <p className="text-sm text-gray-600 mb-3">
          {/* {filteredReferences.length} établissement{filteredReferences.length !== 1 ? 's' : ''} trouvé{filteredReferences.length !== 1 ? 's' : ''} */}
          {filteredReferences.length} {strings.List_lbl_foundReferences}
        </p>
        
        <button 
          onClick={getUserLocation}
          className="w-full btn btn-outline flex items-center justify-center mb-4"
        >
          {userLocation ? (
            <>
              <MapPin className="mr-2" size={16} />
              {strings.List_btn_MyPosition}
            </>
          ) : (
            <>
              <Compass className="mr-2" size={16} />
              {strings.List_btn_UseMyPosition}
            </>
          )}
        </button>
        
        <SearchFilters />
      </div>
      
      <div className="flex-grow overflow-hidden">
        <ReferenceList />
      </div>
    </div>
  );
};

export default Sidebar;