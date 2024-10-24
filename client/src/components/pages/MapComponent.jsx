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
  "CartoDB Voyager": "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  "CartoDB Dark": "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  "Esri WorldStreetMap": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  "Esri WorldImagery": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  "TopoMap": "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
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

const rischioSismColors = {"Comparto 1": "#E92020", "Comparto 2": "#E92020", "Comparto 3": "#E92020", "Comparto 18": "#E92020", "Comparto 19": "#E92020", "Comparto 20": "#E92020", "Comparto 23": "#E92020", "Comparto 34": "#E92020", "Comparto 37": "#E92020",  "Comparto 4": "#FFEA4C", "Comparto 5": "#FFB845","Comparto 6": "#FFB845", "Comparto 8": "#FFB845", "Comparto 13": "#FFB845", "Comparto 15": "#FFB845", "Comparto 17": "#FFEA4C", "Comparto 18": "#FFEA4C", "Comparto 21": "#FFEA4C", "Comparto 22": "#FFEA4C", "Comparto 36": "#FFEA4C", "Comparto 42": "#FFEA4C", "Comparto 43": "#FFEA4C", "Comparto 44": "#FFEA4C", "Comparto 45": "#FFEA4C", "Comparto 46": "#FFEA4C", "Comparto 48": "#FFEA4C", "Comparto 49": "#FFEA4C", "Comparto 50": "#FFEA4C", "Comparto 7": "#BDF39C", "Comparto 9": "#BDF39C", "Comparto 11": "#BDF39C", "Comparto 12": "#BDF39C", "Comparto 14": "#BDF39C", "Comparto 16": "#BDF39C", "Comparto 35": "#BDF39C", "Comparto 38": "#BDF39C", "Comparto 47": "#BDF39C", "Comparto 51": "#BDF39C", "Comparto 52": "#BDF39C"}

const vulnSismicColors = {"Comparto 1": "#E92020", "Comparto 2": "#E92020", "Comparto 3": "#E92020", "Comparto 10": "#E92020", "Comparto 19": "#E92020", "Comparto 20": "#E92020", "Comparto 23": "#E92020", "Comparto 34": "#E92020", "Comparto 37": "#E92020", "Comparto 5": "#FFB845","Comparto 6": "#FFEA4C", "Comparto 8": "#FFEA4C", "Comparto 13": "#FFEA4C", "Comparto 15": "#FFEA4C", "Comparto 17": "#FFEA4C", "Comparto 18": "#FFEA4C", "Comparto 21": "#FFEA4C", "Comparto 22": "#FFEA4C", "Comparto 36": "#FFEA4C", "Comparto 42": "#FFEA4C", "Comparto 43": "#FFEA4C", "Comparto 44": "#FFEA4C", "Comparto 45": "#FFEA4C", "Comparto 46": "#FFEA4C", "Comparto 48": "#FFEA4C", "Comparto 49": "#FFEA4C", "Comparto 50": "#FFEA4C", "Comparto 4": "#BDF39C", "Comparto 7": "#BDF39C", "Comparto 9": "#BDF39C", "Comparto 11": "#BDF39C", "Comparto 12": "#BDF39C", "Comparto 14": "#BDF39C", "Comparto 16": "#BDF39C", "Comparto 35": "#BDF39C", "Comparto 38": "#BDF39C", "Comparto 47": "#BDF39C", "Comparto 51": "#BDF39C", "Comparto 52": "#BDF39C"}

const espSismicColors = {"Comparto 1": "#E92020", "Comparto 2": "#E92020", "Comparto 3": "#E92020", "Comparto 10": "#E92020", "Comparto 19": "#E92020", "Comparto 20": "#E92020", "Comparto 23": "#E92020", "Comparto 34": "#E92020", "Comparto 37": "#E92020", "Comparto 5": "#FFB845","Comparto 6": "#FFB845", "Comparto 8": "#FFB845", "Comparto 13": "#FFEA4C", "Comparto 15": "#FFB845", "Comparto 17": "#FFEA4C", "Comparto 18": "#FFEA4C", "Comparto 21": "#FFB845", "Comparto 22": "#FFB845", "Comparto 36": "#FFEA4C", "Comparto 42": "#FFB845", "Comparto 43": "#FFB845", "Comparto 44": "#FFB845", "Comparto 45": "#FFEA4C", "Comparto 46": "#FFEA4C", "Comparto 48": "#FFB845", "Comparto 49": "#FFEA4C", "Comparto 50": "#FFEA4C", "Comparto 4": "#BDF39C", "Comparto 7": "#BDF39C", "Comparto 9": "#BDF39C", "Comparto 11": "#FFB845", "Comparto 12": "#FFB845", "Comparto 14": "#FFB845", "Comparto 16": "#BDF39C", "Comparto 35": "#BDF39C", "Comparto 38": "#BDF39C", "Comparto 47": "#FFB845", "Comparto 51": "#FFB845", "Comparto 52": "#FFB845"}

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
  const [rischioSelezionato, setRischioSelezionato] = useState("");
  const [isLevelSelezionato, setIsLevelSelezionato] = useState(false);
  const [levelSelezionato, setLevelSelezionato] = useState("");
  const [isScalaSelezionata, setIsScalaSelezionata] = useState(false);
  const [scalaSelezionata, setScalaSelezionata] = useState("");
  

  const [showCompartoMessage, setShowCompartoMessage] = useState(false);
  const [showSelectMessage, setShowSelectMessage] = useState(false);

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

  useEffect(() => {
    if (levelSelezionato && scalaSelezionata) {
      setShowSelectMessage(true);
    } else {
      setShowSelectMessage(false);
    }
  }, [levelSelezionato, scalaSelezionata]);

  
  const loadShapefile1 = (selectedColors) => {
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
                  const color = selectedColors[compartoName];
                  return {
                  color : color || "#000000",
                  fillcolor: color || "#000000",  // Colore dei confini (rosso in questo esempio)
                  weight: 0.4,         // Spessore dei confini
                  opacity: opacity1, // Opacità dei confini
                  fillOpacity: color ? 0.8 : 0.05,
                  }
                  
                },
                onEachFeature: function (feature, layer) {
                  //mostra i numeri per comparto
                  const compartoNumber = feature.properties.NAME;
                  layer.bindTooltip(compartoNumber, { permanent: true, direction: 'center' });
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

const handleRischioClick = (rischio) => {
  if (rischio === "sismico") {
      setIsRischioSelezionato(true);
      setRischioSelezionato("sismico");
      } else {
          setShowCompartoMessage(false);
          setRischioSelezionato("");
      }
    };


const handleLevelClick = (level) => {
  if (level === "vulnerabilità") {
      setIsLevelSelezionato(true);
      setLevelSelezionato("vulnerabilità")
      loadShapefile1(vulnSismicColors);
  } else if (level === "rischio") {
    setIsLevelSelezionato(true);
    setLevelSelezionato("rischio")
    loadShapefile1(rischioSismColors);
    } else if (level === "esposizione") {
      setIsLevelSelezionato(true);
      setLevelSelezionato("esposizione")
      loadShapefile1(espSismicColors);
  } else {
      setLevelSelezionato("");
  }
};

const handleScalaClick = (scala) => {
  setScalaSelezionata(scala)
  if (scala === "comparti") {
      setIsScalaSelezionata(true);
      setScalaSelezionata("comparti")
  } else if (scala === "tutto") {
      setScalaSelezionata("tutto");
  } else {
      setShowCompartoMessage(false);
      setScalaSelezionata(""); // Resetta la scala se non è comparti
  }
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
}, []); 

useEffect(() => {
  if (shapefile1Layer) {
    loadShapefile1(); // Ricarica il layer ogni volta che scalaSelezionata cambia
  }
}, [scalaSelezionata]);

const handleCompartoClick = (layer, compartoName) => {
    console.log(`Hai cliccato sul comparto: ${compartoName}`); 
    // Supponiamo che il comparto cliccato sia "Comparto 1"
    const selectedColor = vulnSismicColors[compartoName]; // Ottieni il colore dal mapping
  if (selectedColor) {
    layer.setStyle({ color: selectedColor }); // Imposta il colore dal mapping
    setImageSrc(selectedColor === vulnSismicColors["Comparto 1"] ? analisiComparto1a : analisiComparto2); // Modifica le immagini in base al comparto
    setIsImageVisible(true); // Mostra l'immagine
  } else {
    setIsImageVisible(false); // Nascondi l'immagine se il comparto non è presente
  }
};

const toggleShapefile1Layer = () => {
  setIsShapefile1Visible(prevVisible => {
      // Inverte la visibilità
      const newVisible = !prevVisible;
      if (newVisible) {
          // Carica i colori solo se il layer diventa visibile
          loadShapefile1(compartoColors);
          setScalaSelezionata("edificati"); // Imposta la scala selezionata
      }
      return newVisible; // Ritorna la nuova visibilità
  });
};

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
  <div className="rischio-boxA">
          <div 
    onClick={() => {
        // handleScalaClick("edificati"); // Passa il valore corretto alla funzione
        toggleShapefile1Layer(); // Esegui la funzione per gestire il layer
        setShowCompartoMessage(true); // Mostra il messaggio del comparto
    }} 
    className= "boxA-opzione">
       <h3>A - Analisi Edificato di Barberino:</h3>
    Analisi edificati per comparto e sottocomparto.</div>  
        {showCompartoMessage && ( // Mostra il messaggio se necessario
          <div className="comparto-message">
            Seleziona sulla mappa il comparto di cui desideri l'analisi.</div>
        )} </div>
           
        <div className="rischio-boxB">
          <div className="scala-box">
                    <h3>B - Analisi per selezione del tipo di rischio</h3>
                    <div onClick={() => handleRischioClick("sismico")} className={`rischio-opzione ${rischioSelezionato ===  "sismico" ? "selected": ""}`}>
                        Rischio sismico
                    </div>
                    <div className="rischio-opzione">Rischio alluvionale</div>
                    <div className="rischio-opzione">Rischio geologico</div>
                </div>
                {isRischioSelezionato && (
               <div className="scala-box">
                        <h3>Selezione della scala </h3>
                        <div onClick={() => {handleScalaClick("territorio")}} className={`scala-opzione ${scalaSelezionata === "territorio" ? "selected" : ""}`}>Territorio<em> - larga scala</em></div>
                        <div onClick={() => {handleScalaClick("comparti")}} className={`scala-opzione ${scalaSelezionata === "comparti" ? "selected" : ""}`}>Comparti<em> - media scala </em></div>
                        <div onClick={() => {handleScalaClick("edificati")}} className={`scala-opzione ${scalaSelezionata === "edificati" ? "selected" : ""}`}>Edificati<em> - scala locale</em></div>
                 </div>)}
                 {isScalaSelezionata  && (
                  <div className="scala-box">
                    <br></br>
                  <em>Seleziona il livello di rischio sismico per vedere i risultati interessati.</em>
        <div onClick={() => {handleLevelClick("rischio")}} className={`level-opzione ${levelSelezionato === "rischio" ? "selected" : ""}`}>Pericolosità<em> - zona azione del sisma</em></div>
        <div onClick={() => {handleLevelClick("vulnerabilità")}} className={`level-opzione ${levelSelezionato === "vulnerabilità" ? "selected" : ""}`}>Vulnerabilità<em> - capacità di resistenza al sisma</em></div>
        <div onClick={() => {handleLevelClick("esposizione")}} className={`level-opzione ${levelSelezionato === "esposizione" ? "selected" : ""}`}>Hazard<em> - esposizione al sisma</em></div>
        </div>)} 
        <div className="scala-box">
      {showSelectMessage && (
        <div className="select-message">
          Seleziona sulla mappa il comparto di cui desideri l'analisi.
        </div>
      )}
    </div>

   </div>
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
