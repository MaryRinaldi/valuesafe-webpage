import React, { useEffect, useRef, useState } from "react";
import L from "leaflet"; 
import "leaflet/dist/leaflet.css"; 
import "../../App.css"; 
import { MapContainer, TileLayer, useMap } from "react-leaflet";

function MapComponent() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Inizializza la mappa OSM
    const mapInstance = L.map(mapContainer.current).setView([41.9028, 12.4964], 12);

    // Aggiungi il layer di tile OSM
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Funzione per caricare i dati GeoGIS
  const loadGeoGISData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data; // Restituisce i dati in formato GeoJSON
    } catch (error) {
      console.error("Error loading GeoGIS data:", error);
    }
  };

  // Funzione per aggiungere i layer dei rischi
  const addRiskLayers = async (riskType) => {
    if (!map) return;

    // Rimuovi i layer esistenti prima di aggiungerne di nuovi
    map.eachLayer((layer) => {
      if (layer.options && layer.options.riskType) {
        map.removeLayer(layer);
      }
    });

    // URL dei dati GeoGIS (sostituisci con l'URL corretto)
    const geoDataUrl = `https://example.com/path/to/your/geojson?riskType=${riskType}`;
    const geoData = await loadGeoGISData(geoDataUrl); // Carica i dati dal GeoGIS

    if (!geoData) return;

    const riskLayer = L.geoJSON(geoData, {
      style: (feature) => {
        let color;
        if (riskType === "flood") {
          color = "blue"; // Rischio alluvionale
        } else if (riskType === "seismic") {
          color = "red"; // Rischio sismico
        } else {
          color = "green"; // Rischio geologico
        }
        return { color: color, weight: 2, opacity: 0.7 };
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`<h3>${feature.properties.name}</h3><p>Rischio: ${riskType}</p>`);
        layer.options.riskType = riskType; // Aggiunge il tipo di rischio come opzione per rimuovere il layer successivamente
      },
    });

    riskLayer.addTo(map);
  };

  return (
    <div>
      <div className="controls">
        <button onClick={() => addRiskLayers("flood")}>Rischio Alluvionale</button>
        <button onClick={() => addRiskLayers("seismic")}>Rischio Sismico</button>
        <button onClick={() => addRiskLayers("geological")}>Rischio Geologico</button>
      </div>
      <div
        className="map-container"
        id="map-container"
        ref={mapContainer}
        style={{ width: "100%", height: "400px" }}
      />

    </div>
  );
}

export default MapComponent;
