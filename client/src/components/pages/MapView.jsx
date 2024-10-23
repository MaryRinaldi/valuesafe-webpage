import React from 'react';
import MapComponent from './MapComponent';
import proj4 from 'proj4';

const MapView = ({  goBack }) => {
  return (
    <div>
      <h3>ValueSafe Map</h3>
      {/* <button onClick={goBack}><span>&#9198;</span> Go Back to selector</button> */}
      <MapComponent   />
      <h6>
        The boundaries and names shown and the designations used on this map do not imply the expression of any opinion whatsoever on the part of ValueSafe concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers and boundaries.
      </h6>
    </div>
  );
};

export default MapView;
