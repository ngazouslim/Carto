/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { StrictMode } from 'react';
import type { ICartoProps } from './ICartoProps';
import MapView from './subComponents/map/MapView';
import Sidebar from './subComponents/sidebar/Sidebar';
import DetailModal from './subComponents/modals/DetailModal';
import { useReferences } from './context/ReferencesContext';
import { useMap } from './context/MapContext';
import { MapProvider } from './context/MapContext';
import styles from './Carto.module.scss';
import { ReferencesProvider } from './context/ReferencesContext';
import './tailwind.css';
import './tailwind.generated.css';
import { Reference } from '../types';

const CartoContent: React.FC<{ hasTeamsContext: boolean }> = ({ hasTeamsContext }) => {
  const { selectedReference } = useReferences();
  const { userLocation } = useMap();

  return (
    <div>
      <div>
            <h1>Selected Reference</h1>
            <p>{selectedReference ? selectedReference.adresse : 'No reference selected'}</p>
            <h1>References</h1>
            <ul>
              {useReferences().references.map((ref: Reference, index) => (
                <li key={index}>{ref.titre}</li>
              ))}
            </ul>
          </div>

      <section className={`${styles.carto} ${hasTeamsContext ? styles.teams : ''}`}>
      {/* <div className="flex h-screen w-screen overflow-hidden"> */}
      <div className="flex h-screen overflow-hidden">
      <div className="relative flex-grow">
        <MapView />
        {!userLocation && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md z-[1000] text-sm">
            Activez la géolocalisation pour de meilleurs résultats
          </div>
        )}
      </div>
      <Sidebar />
      <DetailModal />
    </div>
      </section>
    </div>
  );
};

const Carto: React.FC<ICartoProps> = (props) => {
  const { hasTeamsContext } = props;

  return (
    <StrictMode>
      <MapProvider>
        <ReferencesProvider>
          <CartoContent hasTeamsContext={hasTeamsContext} />
        </ReferencesProvider>
      </MapProvider>
    </StrictMode>
  );
};

export default Carto;

// const Carto: React.FC<ICartoProps> = (props) => {
//   const {
//     hasTeamsContext,
//   } = props;

  
//   const { selectedReference } = useReferences();
//   const { userLocation } = useMap();

//   return (
//     <StrictMode>
//       <MapProvider>
//         <ReferencesProvider>
//         <div>
//           <h1>Selected Reference</h1>
//           <p>{selectedReference ? selectedReference.titre : 'No reference selected'}</p>
//           <h1>References</h1>
          
//         </div>
//           <section className={`${styles.carto} ${hasTeamsContext ? styles.teams : ''}`}>
//             <MapView />
//             {!userLocation && (
//               <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md z-[1000] text-sm">
//                 Activez la géolocalisation pour de meilleurs résultats
//               </div>
//             )}
//             <Sidebar />
//             <DetailModal />
//           </section>
//         </ReferencesProvider>
//       </MapProvider>
//     </StrictMode>
//   );
// };

// export default Carto;