/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { StrictMode, useEffect, useState } from 'react';
import type { ICartoProps } from './ICartoProps';
import { Reference } from '../types';
import MapView from './subComponents/map/MapView';
import Sidebar from './subComponents/sidebar/Sidebar';
import DetailModal from './subComponents/modals/DetailModal';
import { useMap } from './context/MapContext';
import { MapProvider } from './context/MapContext';
import { ReferencesProvider } from './context/ReferencesContext';
import styles from './Carto.module.scss';
import './tailwind.css';
import './tailwind.generated.css';
import * as strings from 'CartoWebPartStrings';


import { I18nManager } from '../loc/i18nManager';
// initialize i18n manager with the strings
I18nManager.initialize({ ...strings });

const CartoContent: React.FC<{ props: ICartoProps }> = ({ props }) => {

  const { userLocation } = useMap();

  

  //render
  return (
    <div >
      <section className={`${styles.carto} ${props.hasTeamsContext ? styles.teams : ''}`}>
      
      <div className="flex h-screen overflow-hidden">
      <div className="relative flex-grow">
        <MapView />
        {!userLocation && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md z-8 text-sm">
            {I18nManager.getString('Map_geolocateMessage')}
          </div>
        )}
      </div>
      <Sidebar />
      <DetailModal props={{ customActions: props.customActions }} />
    </div>
      </section>
    </div>
  );
};


// Main Carto component to encapsulate the context providers
const Carto: React.FC<ICartoProps> = (props) => {
  const [, setI18n] = useState<I18nManager | null>(null);
  const [references, setReferences] = useState<Reference[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.jsonI18nUrl) {
      // load translations from the provided URL
      I18nManager.loadTranslations(props.jsonI18nUrl)
        .then(() => {
          console.log('Translations loaded successfully');
          setI18n(I18nManager); // Set the loaded i18n instance
        })
        .catch((error) => {
          setError(error.message)
          console.error('Error loading translations:', error);
        });
    }
  }, [props.jsonI18nUrl]);


  // Fetch JSON data
  useEffect(() => {
    if (props.jsonUrl) {
      fetch(props.jsonUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error when loading data : ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
         
          console.log('Fetched references:', data);
          setReferences(data)
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        });
    }
  }, [props.jsonUrl]); 

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (references.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <StrictMode>
      <MapProvider>
        <ReferencesProvider initialReferences={references}>
          <CartoContent props={props} />
        </ReferencesProvider>
      </MapProvider>
    </StrictMode>
  );
};

export default Carto;