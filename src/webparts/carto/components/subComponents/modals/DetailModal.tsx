import * as React from 'react';
const { useRef, useEffect } = React;
import { useReferences } from '../../context/ReferencesContext';
import { useMap } from '../../context/MapContext';
import { X, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { I18nManager } from '../../../loc/i18nManager';
//const CartoContent: React.FC<{ props: ICartoProps }> = ({ props }) => {

export interface IDetailModalProps {
  customActions: { title: string; id: string; class?: string }[]; // Array of custom actions
}
//const CartoContent: React.FC<{ props: ICartoProps }> = ({ props }) => {
const DetailModal: React.FC<{ props: IDetailModalProps }> = ({props}) => {
  const { 
    selectedReference, 
    setSelectedReference,
    travelTimes,
    navigationLinks
  } = useReferences();
  
  const { userLocation } = useMap();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedReference(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSelectedReference]);
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedReference(null);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setSelectedReference]);
  
  if (!selectedReference) return null;
  
  const travelTime = travelTimes[selectedReference.id];
  const links = navigationLinks[selectedReference.id];
  
  // Parse autresDetails for display
  const renderDetails = () => {
    const details = selectedReference.autresDetails;
    return (
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">{I18nManager.getString('Details_lbl_additionalInformation')}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.keys(details).map(key => {
            const value = details[key];
            // Skip complex nested objects or arrays for display
            if (typeof value === 'object') {
              return null;
            }
            
            const displayKey = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase());
              
            return (
              <div key={key} className="flex flex-col">
                <span className="text-gray-600">{displayKey}</span>
                <span className="font-medium">{value.toString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <>
     <div className="dialog-details relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
 
      <div className="dialog-details-overlay fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

      <div className="dialog-details-content fixed inset-0 z-10 ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
            <div className="dialog-details-content-card bg-white px-6 pt-6 pb-6 sm:p-8 sm:pb-8">
            
              {selectedReference && (
              <div ref={modalRef} className="relative">
                <div className="flex">
                  <div className="w-1/3">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={selectedReference.image} 
                        alt={selectedReference.titre} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="w-2/3 p-6">
                    <button 
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      onClick={() => setSelectedReference(null)}
                      aria-label="Fermer"
                    >
                      <X size={20} />
                    </button>
                    
                    <h2 className="text-2xl font-bold mb-1">{selectedReference.titre}</h2>
                    <p className="text-sm text-gray-700 mb-4 flex items-center">
                      <MapPin size={16} className="mr-1 text-gray-500" />
                      {selectedReference.adresse}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="badge badge-blue">{selectedReference.region}</span>
                      {/* {Object.entries(selectedReference.autresDetails).slice(0, 2).map(([key, value]) => { */}
                      {Object.keys(selectedReference.autresDetails).slice(0, 2).map(key => {
                        const value = selectedReference.autresDetails[key];
                        if (typeof value === 'string' && key === 'typeEtablissement') {
                          return (
                            <span key={key} className="badge badge-orange">
                              {value}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                    
                    <p className="text-gray-700 mb-6">{selectedReference.descriptionCourte}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                      <a 
                        href={`tel:${selectedReference.telephone}`}
                        className="btn btn-outline flex items-center justify-center"
                      >
                        <Phone size={16} className="mr-2" />
                        {selectedReference.telephone}
                      </a>
                      
                      {travelTime && (
                        <div className="flex items-center justify-center bg-blue-50 rounded-lg px-4 py-2">
                          <Clock size={16} className="mr-2 text-blue-600" />
                          <span>
                            <span className="font-semibold text-blue-600">{Math.round(travelTime.duration)} min</span>
                            <span className="text-sm text-gray-600"> en voiture</span>
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {userLocation && links && (
                      <div className="flex gap-3 mb-6">
                        <a 
                          href={links.google}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary flex items-center justify-center flex-1"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Google Maps
                        </a>
                        <a 
                          href={links.apple}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline flex items-center justify-center flex-1"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Apple Maps
                        </a>
                      </div>
                    )}
                    
                    

                    {/* Render additional details */}
                    {renderDetails()}
                    
                    {/* Render custom actions if provided */}
                    <div className="mt-6 additionalActions">
                    <h3 className="font-semibold text-lg mb-2">{I18nManager.getString('Details_lbl_moreActions')}</h3>
                    {props.customActions && props.customActions.map((action, index) => (
                      <button 
                        key={index} 
                        className={`btn ${action.class} btn-outline flex items-center justify-center mb-2`}
                        onClick={() => console.log(`Custom action triggered: ${action.id}`)}
                      >
                        {action.title}
                      </button>
                    ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold text-lg mb-2">Description</h3>
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedReference.descriptionRich }} 
                      />
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            )}
            </div>
              
          </div>
        </div>
      </div>
    </div>



    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl z-30 max-h-[70vh] overflow-y-auto fade-in slide-up" hidden>
      {selectedReference && (
        <div ref={modalRef} className="relative">
          <div className="flex">
            <div className="w-1/3">
              <div className="h-48 overflow-hidden">
                <img 
                  src={selectedReference.image} 
                  alt={selectedReference.titre} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="w-2/3 p-6">
              <button 
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                onClick={() => setSelectedReference(null)}
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-bold mb-1">{selectedReference.titre}</h2>
              <p className="text-sm text-gray-700 mb-4 flex items-center">
                <MapPin size={16} className="mr-1 text-gray-500" />
                {selectedReference.adresse}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-blue">{selectedReference.region}</span>
                {/* {Object.entries(selectedReference.autresDetails).slice(0, 2).map(([key, value]) => { */}
                {Object.keys(selectedReference.autresDetails).slice(0, 2).map(key => {
                  const value = selectedReference.autresDetails[key];
                  if (typeof value === 'string' && key === 'typeEtablissement') {
                    return (
                      <span key={key} className="badge badge-orange">
                        {value}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              
              <p className="text-gray-700 mb-6">{selectedReference.descriptionCourte}</p>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <a 
                  href={`tel:${selectedReference.telephone}`}
                  className="btn btn-outline flex items-center justify-center"
                >
                  <Phone size={16} className="mr-2" />
                  {selectedReference.telephone}
                </a>
                
                {travelTime && (
                  <div className="flex items-center justify-center bg-blue-50 rounded-lg px-4 py-2">
                    <Clock size={16} className="mr-2 text-blue-600" />
                    <span>
                      <span className="font-semibold text-blue-600">{Math.round(travelTime.duration)} min</span>
                      <span className="text-sm text-gray-600"> en voiture</span>
                    </span>
                  </div>
                )}
              </div>
              
              {userLocation && links && (
                <div className="flex gap-3 mb-6">
                  <a 
                    href={links.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex items-center justify-center flex-1"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Google Maps
                  </a>
                  <a 
                    href={links.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline flex items-center justify-center flex-1"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Apple Maps
                  </a>
                </div>
              )}
              
              {renderDetails()}
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedReference.descriptionRich }} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default DetailModal;