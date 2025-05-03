import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import { useReferences } from '../../context/ReferencesContext';
import ReferenceItem from './ReferenceItem';

const ReferenceList: React.FC = () => {
  const { filteredReferences } = useReferences();
  
  // If no results, show empty state
  if (filteredReferences.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-gray-600 mb-2">Aucun résultat ne correspond à vos critères</p>
          <p className="text-sm text-gray-500">Essayez de modifier vos filtres ou d'élargir la zone de recherche sur la carte</p>
        </div>
      </div>
    );
  }
  
  return (
    <List
      className="virtualized-list"
      height={window.innerHeight - 230} // Adjust based on header height
      width={384} // 96rem (w-96)
      itemCount={filteredReferences.length}
      itemSize={150} // Height of each item in pixels
    >
      {/* {({ index, style }) => ( */}
      {({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style}>
          <ReferenceItem reference={filteredReferences[index]} />
        </div>
      )}
    </List>
  );
};

export default ReferenceList;