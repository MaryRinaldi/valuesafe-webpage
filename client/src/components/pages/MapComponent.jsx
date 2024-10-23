import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import shp from "shpjs";
import "../../App.css";
import analisiComparto1a from "../../assets/images/analisi_comparto1a.png"
import analisiComparto2 from "../../assets/images/analisi_comparto2.png"

const baseMaps = {
  "OpenStreetMap": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "CartoDB Positron": "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  "CartoDB Dark": "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  "Esri WorldStreetMap": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  "Esri WorldImagery": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
};
const compartoColors = {
  "Comparto 1": "#785976",
  "Comparto 20": "#845B82",
  "Comparto 19": "#CDA5CA",
  "Comparto 34": "#FFA8A8",
  "Comparto 50": "#F09002",
  "Comparto 43": "#F5A65C",
  "Comparto 44": "#F6B679",
  "Comparto 15": "#F8CBA0",
  "Comparto 52": "#5B7A84",
  "Comparto 7": "#A7C3E5",
  "Comparto 16": "#80977D",
  "Comparto 21": "#FCEAD9",
  "Comparto 22": "#FDF5EC",
  "Comparto 8": "#CBCACA",
  "Comparto 9": "#CBCACA",
};

function MapComponent() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [basemap, setBasemap] = useState(baseMaps["OpenStreetMap"]);
  const [shapefile1Layer, setShapefile1Layer] = useState(null);
  const [isShapefile1Visible, setIsShapefile1Visible] = useState(false);


  const [opacity1, setOpacity1] = useState(1);

  const [isImageVisible, setIsImageVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isRischioSelezionato, setIsRischioSelezionato] = useState(false);
  const [scalaSelezionata, setScalaSelezionata] = useState("");
  const [showCompartoMessage, setShowCompartoMessage] = useState(false);

  // const [geojsonLayer, setGeojsonLayer] = useState(null); // Nuovo stato per il GeoJSON
  // const [isGeojsonVisible, setIsGeojsonVisible] = useState(false)

  // const loadGeoJSONLayer = () => {
  //   const geojsonUrl = "/geojson/mylayer.geojson"; // Percorso del file GeoJSON

  //   fetch(geojsonUrl)
  //     .then((response) => response.json())
  //     .then((geojson) => {
  //       if (geojsonLayer) {
  //         map.removeLayer(geojsonLayer);
  //       }
  //       const newLayer = L.geoJSON(geojson, {
  //         style: { color: "green", weight: 2, opacity: 0.8 },
  //       });
  //       setGeojsonLayer(newLayer);
  //       newLayer.addTo(map);
  //     })
  //     .catch((error) =>
  //       console.error("Errore nel caricamento del file GeoJSON:", error)
  //     );
  // };

  // const toggleGeoJSONLayer = () => {
  //   if (isGeojsonVisible) {
  //     if (geojsonLayer) {
  //       map.removeLayer(geojsonLayer);
  //     }
  //   } else {
  //     loadGeoJSONLayer();
  //   }
  //   setIsGeojsonVisible(!isGeojsonVisible);
  // };


  const handleChangeBasemap = (event) => {
    const selectedBasemap = baseMaps[event.target.value];
    setBasemap(selectedBasemap); // Aggiorna lo stato del basemap
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          layer.setUrl(selectedBasemap);
        }
      });
    }
  };

  
  const loadShapefile1 = () => {
    const url = "/shapefiles/comparti_BM_rev00_v17_EPSG3857.zip";
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => shp(arrayBuffer))
        .then(geojson => {
            // Aggiungi un identificatore ai poligoni se non esiste già
            geojson.features.forEach((feature, index) => {
                if (!feature.properties.NAME) {
                    feature.properties.NAME = `Comparto ${index + 1}`; // Assegna un nome predefinito
                }
            });

            if (shapefile1Layer) {
                map.removeLayer(shapefile1Layer);
            }
            const newLayer = L.geoJSON(geojson, {
                style: (feature) => { 
                  const compartoName = feature.properties.NAME;
                  const color = compartoColors[compartoName];
                  return {
                  color : color || "#000000",
                  fillcolor: color || "#000000",  // Colore dei confini (rosso in questo esempio)
                  weight: 1,         // Spessore dei confini
                  opacity: opacity1, // Opacità dei confini
                  fillOpacity: color ? 0.8 : 0.05,
                  }
                  
                },
                onEachFeature: function (feature, layer) {
                  // const compartoNumber = feature.properties.NAME;
                  // layer.bindTooltip(compartoNumber, { permanent: true, direction: 'center' });
                  layer.off('click');
                    layer.on('click', function (e) {
                        const compartoName = feature.properties.NAME; 
                        handleCompartoClick(layer, compartoName); // Passiamo il layer cliccato
                    });
                }
            });
            setShapefile1Layer(newLayer);
            newLayer.addTo(map);
        })
        .catch(error => console.error("Errore nel caricamento del file shapefile:", error));
};

const handleCompartoClick = (layer, compartoName) => {
    console.log(`Hai cliccato sul comparto: ${compartoName}`); 
    // Supponiamo che il comparto cliccato sia "Comparto 1"
    const selectedColor = compartoColors[compartoName]; // Ottieni il colore dal mapping
  if (selectedColor) {
    layer.setStyle({ color: selectedColor }); // Imposta il colore dal mapping
    setImageSrc(selectedColor === compartoColors["Comparto 1"] ? analisiComparto1a : analisiComparto2); // Modifica le immagini in base al comparto
    setIsImageVisible(true); // Mostra l'immagine
  } else {
    setIsImageVisible(false); // Nascondi l'immagine se il comparto non è presente
  }
};




  const handleRischioClick = (rischio) => {
    if (rischio === "sismico") {
        setIsRischioSelezionato(true);
    }
};

const handleScalaClick = (scala) => {
    if (scala === "comparti") {
        setScalaSelezionata("comparti");
        setShowCompartoMessage(true);
        toggleShapefile1Layer(); // Attiva il layer dei comparti
      } else {
        setShowCompartoMessage(false); // Nascondi il messaggio se si seleziona un'altra scala
      }
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



  useEffect(() => {
    const mapInstance = L.map(mapContainer.current).setView([44.0030, 11.2370], 15);
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


  return (
    <div>
      <div className="horizontal-menu">
      {/* <button onClick={toggleGeoJSONLayer}>
          {isGeojsonVisible ? "Nascondi GeoJSON" : "Mostra GeoJSON"}
        </button>
  */}
        <div className="rischio-box">
                    <h3>Seleziona il Rischio</h3>
                    <div onClick={() => handleRischioClick("sismico")} className={`rischio-opzione ${isRischioSelezionato && "selected"}`}>
                        Rischio sismico
                    </div>
                    <div className="rischio-opzione">Rischio alluvionale</div>
                    <div className="rischio-opzione">Rischio geologico</div>
                </div>

                {isRischioSelezionato && (
                    <div className="scala-box">
                        <h3>Seleziona la Scala</h3>
                        <div onClick={() => handleScalaClick("tutto")} className="scala-opzione">Scala larga = Tutto il territorio</div>
                        <div onClick={() => handleScalaClick("comparti")} className={`scala-opzione ${scalaSelezionata === "comparti" && "selected"}`}>
                            Scala media = Scelta dei comparti
                        </div>
                        <div className="scala-opzione">Scala locale = Scelta degli edifici</div>
                    </div>
                )}
                    {showCompartoMessage && ( // Mostra il messaggio se necessario
          <div className="comparto-message">
            Seleziona sulla mappa il comparto che desideri analizzare.
          </div>
        )}
      
      </div>
  
      <div className="map-image-container">
    <div className="map-container" ref={mapContainer}>
        {/* Selettore posizionato sopra la mappa */}
        <select onChange={handleChangeBasemap} className="basemap-selector">
            {Object.keys(baseMaps).map((key) => (
                <option key={key} value={key}>{key}</option>
            ))}
        </select>
    </div>
    {isImageVisible && (
        <div className="image-container">
            <img src={imageSrc} alt="Analisi Comparti" />
        </div>
    )}

</div>
    </div>
  );
  
}

export default MapComponent;
