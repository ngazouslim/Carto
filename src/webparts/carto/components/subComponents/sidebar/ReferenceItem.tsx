import * as React from 'react';
import { Reference } from '../../../types';
import { useReferences } from '../../context/ReferencesContext';
//import { Clock, MapPin } from 'lucide-react';
import { Clock } from 'lucide-react';

interface ReferenceItemProps {
  reference: Reference;
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({ reference }) => {
  const { 
    setHighlightedReference, 
    setSelectedReference, 
    highlightedReference,
    travelTimes
  } = useReferences();
  
  const isHighlighted = highlightedReference?.id === reference.id;
  const travelTime = travelTimes[reference.id];
  
  return (
    <div 
      className={`p-3 border-b cursor-pointer transition-colors duration-200 hover:bg-blue-50 ${
        isHighlighted ? 'bg-blue-50' : ''
      }`}
      onMouseEnter={() => setHighlightedReference(reference)}
      onMouseLeave={() => setHighlightedReference(null)}
      onClick={() => setSelectedReference(reference)}
    >
      <div className="flex">
        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden mr-3 flex-shrink-0">
          <img 
            src={reference.image} 
            alt={reference.titre} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-base line-clamp-1">{reference.titre}</h3>
          <p className="text-xs text-gray-600 mb-1 line-clamp-1">{reference.adresse}</p>
          <p className="text-sm text-gray-800 line-clamp-2 mb-1">{reference.descriptionCourte}</p>
          
          <div className="flex justify-between items-center">
            <span className="badge badge-blue">{reference.region}</span>
            
            {travelTime && (
              <span className="text-xs text-gray-600 flex items-center">
                <Clock size={12} className="mr-1" />
                {Math.round(travelTime.duration)} min
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceItem;