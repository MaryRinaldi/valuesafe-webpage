import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import shp from "shpjs";
import "../../App.css";
import proj4 from 'proj4';

const baseMaps = {
  "OpenStreetMap": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "CartoDB Positron": "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  "CartoDB Dark": "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  "Esri WorldStreetMap": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  "Esri WorldImagery": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
};

function MapComponent() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [basemap, setBasemap] = useState(baseMaps["OpenStreetMap"]);
  const [shapefile1Layer, setShapefile1Layer] = useState(null);
  const [shapefile2Layer, setShapefile2Layer] = useState(null);
  const [shapefile3Layer, setShapefile3Layer] = useState(null); // Nuovo stato per il layer edifici
  const [isShapefile1Visible, setIsShapefile1Visible] = useState(false);
  const [isShapefile2Visible, setIsShapefile2Visible] = useState(false);
  const [isShapefile3Visible, setIsShapefile3Visible] = useState(false); // Stato per il layer edifici
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1); // Opacità per il layer edifici

  const handleChangeBasemap = (event) => {
    const selectedBasemap = baseMaps[event.target.value];
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          layer.setUrl(selectedBasemap);
        }
      });
    }
  };

  const loadShapefile1 = () => {
    const url = "/shapefiles/comparti_BM_rev00_v17_2.zip";
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => shp(arrayBuffer))
      .then(geojson => {
        if (shapefile1Layer) {
          map.removeLayer(shapefile1Layer);
        }
        const newLayer = L.geoJSON(geojson, {
          style: { opacity: opacity1 }
        });
        setShapefile1Layer(newLayer);
        newLayer.addTo(map);
      })
      .catch(error => console.error("Errore nel caricamento del file shapefile:", error));
  };

  const loadShapefile2 = () => {
    const url = "/shapefiles/confini_comunali.zip";
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => shp(arrayBuffer))
      .then(geojson => {
        if (shapefile2Layer) {
          map.removeLayer(shapefile2Layer);
        }
        const newLayer = L.geoJSON(geojson, {
          style: { opacity: opacity2 }
        });
        setShapefile2Layer(newLayer);
        newLayer.addTo(map);
      })
      .catch(error => console.error("Errore nel caricamento del file shapefile:", error));
  };

  const loadShapefile3 = () => { // Nuova funzione di caricamento per edifici
    const url = "/shapefiles/edifici ordinari/edifici_ordinari.zip";
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => shp(arrayBuffer))
      .then(geojson => {
        if (shapefile3Layer) {
          map.removeLayer(shapefile3Layer);
        }
        const newLayer = L.geoJSON(geojson, {
          style: { opacity: opacity3 }
        });
        setShapefile3Layer(newLayer);
        newLayer.addTo(map);
      })
      .catch(error => console.error("Errore nel caricamento del file shapefile:", error));
  };

  const toggleShapefile1Layer = () => {
    if (isShapefile1Visible) {
      if (shapefile1Layer) {
        map.removeLayer(shapefile1Layer);
      }
    } else {
      loadShapefile1();
    }
    setIsShapefile1Visible(!isShapefile1Visible);
  };

  const toggleShapefile2Layer = () => {
    if (isShapefile2Visible) {
      if (shapefile2Layer) {
        map.removeLayer(shapefile2Layer);
      }
    } else {
      loadShapefile2();
    }
    setIsShapefile2Visible(!isShapefile2Visible);
  };

  const toggleShapefile3Layer = () => { // Nuova funzione per il layer edifici
    if (isShapefile3Visible) {
      if (shapefile3Layer) {
        map.removeLayer(shapefile3Layer);
      }
    } else {
      loadShapefile3();
    }
    setIsShapefile3Visible(!isShapefile3Visible);
  };

  useEffect(() => {
    const mapInstance = L.map(mapContainer.current).setView([43.9983, 11.2328], 13);
    L.tileLayer(basemap, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);
    setMap(mapInstance);
    return () => {
      mapInstance.remove();
    };
  }, []); // Solo al montaggio

  useEffect(() => {
    if (shapefile1Layer) {
      shapefile1Layer.setStyle({ opacity: opacity1 });
    }
  }, [opacity1]);

  useEffect(() => {
    if (shapefile2Layer) {
      shapefile2Layer.setStyle({ opacity: opacity2 });
    }
  }, [opacity2]);

  useEffect(() => {
    if (shapefile3Layer) {
      shapefile3Layer.setStyle({ opacity: opacity3 });
    }
  }, [opacity3]);

  return (
    <div style={{ display: 'flex' }}>
      {/* Menu verticale */}
      <div className="vertical-menu">
        <div onClick={toggleShapefile1Layer} className={`menu-item ${isShapefile1Visible ? 'selected' : ''}`}>
          Layer Compartimenti
        </div>
        {isShapefile1Visible && (
          <input
            type="range"
            min="0"
            max="100"
            value={opacity1 * 100}
            onChange={(e) => setOpacity1(e.target.value / 100)}
            className="opacity-slider"
          />
        )}

        <div onClick={toggleShapefile2Layer} className={`menu-item ${isShapefile2Visible ? 'selected' : ''}`}>
          Layer Confini Comunali
        </div>
        {isShapefile2Visible && (
          <input
            type="range"
            min="0"
            max="100"
            value={opacity2 * 100}
            onChange={(e) => setOpacity2(e.target.value / 100)}
            className="opacity-slider"
          />
        )}

        <div onClick={toggleShapefile3Layer} className={`menu-item ${isShapefile3Visible ? 'selected' : ''}`}>
          Layer Edifici Ordinari
        </div>
        {isShapefile3Visible && (
          <input
            type="range"
            min="0"
            max="100"
            value={opacity3 * 100}
            onChange={(e) => setOpacity3(e.target.value / 100)}
            className="opacity-slider"
          />
        )}
      </div>

      {/* Contenitore per la mappa */}
      <div
        className="map-container"
        id="map-container"
        ref={mapContainer}
        style={{ width: "60%", height: "500px" }}
      />
    </div>
  );
}

export default MapComponent;
