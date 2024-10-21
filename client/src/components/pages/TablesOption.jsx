//   import React, { useState } from "react";
// import Select from "react-select";

//   const TablesOption = ({ goBack }) => {
//     const [step, setStep] = useState([0]);
//     const [geographicArea, setGeographicArea] = useState('');
//     const [continent, setContinent] = useState('');
//     const [region, setRegion] = useState('');
//     const [animal, setAnimal] = useState([]);
//     const [largeRuminants, setLargeRuminants] = useState([]);
//     const [smallRuminants, setSmallRuminants] = useState([]);
//     const [diseases, setDiseases] = useState([]);
  
//     const handleGeographicAreaChange = (selectedOption) => {
//       const value = selectedOption ? selectedOption.value : '';
//       setGeographicArea(value);
//       setContinent('');
//       setRegion('');
//       setAnimal([]);
//       setLargeRuminants([]);
//       setSmallRuminants([]);
//       setDiseases([]);
//       if (value === 'Whole World' || value === 'Country') {
//         setStep([0, 2]);
//       } else {
//         setStep([0, 1]);
//       }
//     };
  
//     const handleContinentChange = (selectedOption) => {
//       const value = selectedOption ? selectedOption.value : '';
//       setContinent(value);
//       setStep(prevStep => [...prevStep, 2]);
//     };
  
//     const handleRegionChange = (selectedOption) => {
//       const value = selectedOption ? selectedOption.value : '';
//       setRegion(value);
//       setStep(prevStep => [...prevStep, 2]);
//     };
  
//     const handleAnimalChange = (selectedOption) => {
//       const value = selectedOption ? selectedOption.value : '';
//       if (value === 'All') {
//         setAnimal(['All']);
//         setLargeRuminants(largeRuminantsOptions.map(option => option.label));
//         setSmallRuminants(smallRuminantsOptions.map(option => option.label));
//         setStep(prevStep => [...prevStep, 4]);
//       } else if (value === 'Pigs') {
//         setAnimal(['Pigs']);
//         setStep(prevStep => [...prevStep, 4]);
//       } else {
//         setAnimal([value]);
//         setStep(prevStep => [...prevStep, 3]);
//       }
//     };
  
//     const handleSpecificAnimalChange = (category, selectedOptions) => {
//       const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
//       if (category === 'Large Ruminants') {
//         setLargeRuminants(values);
//           } else if (category === 'Small Ruminants') {
//         setSmallRuminants(values);
//     }
//   };
  
//     const handleDiseaseChange = (selectedOptions) => {
//       const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
//       setDiseases(values)
//     };
  
//     const handleViewData = () => {
//       setStep(prevStep => [...prevStep, 5]);
//     };
  
//     const geographicOptions = [
//       { value: 'Whole World', label: 'Whole World' },
//       { value: 'Continent', label: 'Continent' },
//       { value: 'World region', label: 'World region' },
//       { value: 'Country', label: 'Country' },
//     ];
//     const continentOptions = [
//       { value: 'Africa', label: 'Africa' },
//       { value: 'Asia', label: 'Asia' },
//       { value: 'Europe', label: 'Europe' },
//       { value: 'North America', label: 'North America' },
//       { value: 'South America', label: 'South America' },
//       { value: 'Australia', label: 'Australia' },
//       { value: 'Antarctica', label: 'Antarctica' },
//     ];
//     const regionOptions = [
//       { value: 'Northern Africa', label: 'Northern Africa' },
//       { value: 'Eastern Africa', label: 'Eastern Africa' },
//       { value: 'Middle Africa', label: 'Middle Africa' },  
//       { value: 'Southern Africa', label: 'Southern Africa' },          
//       { value: 'Western Africa', label: 'Western Africa' },
//       { value: 'Caribbean', label: 'Caribbean' },
//       { value: 'Central America', label: 'Central American' },
//       { value: 'South America', label: 'South America' },
//       { value: 'Northern America', label: 'Northern America' },
//       { value: 'Central Asia', label: 'Central Asia' },
//       { value: 'Eastern Asia', label: 'Eastern Asia' },
//       { value: 'South-eastern Asia', label: 'South-eastern Asia' },  
//       { value: 'Southern Asia', label: 'Southern Asia' },
//       { value: 'Western Asia', label: 'Western Asia' },
//       { value: 'Eastern Europe', label: 'Eastern Europe' },  
//       { value: 'Northern Europe', label: 'Northern Europe' },
//       { value: 'Southern Europe', label: 'Southern Europe' },
//       { value: 'Western Europe', label: 'Western Europe' },
//       { value: 'Australia and New Zealand', label: 'Australia and New Zealand' },
//       { value: 'Melanesia', label: 'Melanesia' },
//       { value: 'Micronesia', label: 'Micronesia' },
//       { value: 'Polynesia', label: 'Polynesia' },
//     ];

//   const animalOptions = [
//     { value: 'Large Ruminants', label: 'Large Ruminants' },
//     { value: 'Small Ruminants', label: 'Small Ruminants' },
//     { value: 'Pigs', label: 'Pigs' },
//   ];

//   const largeRuminantsOptions = [
//     { value: 'Cattles', label: 'Cattles' },
//     { value: 'Buffalos', label: 'Buffalos' },
//     { value: 'Horses', label: 'Horses' },
//     { value: 'Camels', label: 'Camels' },
//   ];

//   const smallRuminantsOptions = [
//     { value: 'Goats', label: 'Goats' },
//     { value: 'Sheeps', label: 'Sheeps' },
//   ];
//   const diseaseOptions = [
//     { value: 'Foot-and-Mouth', label: 'Foot-and-Mouth' },
//     { value: 'Peste des Petits Ruminants', label: 'Peste des Petits Ruminants' },
//     { value: 'Lumpy Skin', label: 'Lumpy Skin' },
//     { value: 'Rift Valley Fever', label: 'Rift Valley Fever' },
//     { value: 'Sheep and Goat Pox', label: 'Sheep and Goat Pox' },
//   ]; 

//     const handleStepBack = () => {
//       setStep(step.slice(0, -1));
//     };

//     const customStyles = {
//       control: (provided) => ({
//         ...provided,
//         border: '2px solid #82A627',
//         borderRadius: '16px',
//         minHeight: 'unset',
//         margin: '0.5rem 0',
//         padding: '0.1rem',
//         width: '200px',
//         transition: 'none',
//         boxShadow: 'none',
//         outline: 'none', 
//         '&:hover': {  
//           borderColor: '#82A627',  
//           cursor: 'default',
//           boxShadow: 'none',
//           outline: 'none', 
//         }
//       }),
//       menu: (provided) => ({
//         ...provided,
//         border: '2px solid #82A627',  
//         borderRadius: '16px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       }),
//       option: (provided, state) => ({
//         ...provided,
//         backgroundColor: state.isSelected ? '#82A627' : '',  
//         color: state.isSelected ? '#ffffff' : '#000000',  
//         padding: '0.5rem', 
//         borderRadius: '8px',  
//         '&:hover': {
//           backgroundColor: '#82A627',  
//           color: '#ffffff',  
//           cursor: 'pointer',  
//         }
//       }),
//     };
  
//     return (
//       <>
//         <h3>ValueSafe tables</h3>
//         <button onClick={goBack}><span>&#9198;</span> Go Back to selector</button>
//         <div className="step-container">
//           {step.includes (0) && (
//           <div className="menu-container">
//             <label>First, choose geographic area:</label>
//             <Select styles={customStyles}
//             options={geographicOptions}
//             onChange={handleGeographicAreaChange}
//             isClearable
//             />
//             </div>
//         )}
  
//         {step.includes(1) && geographicArea === 'Continent' && (
//           <div className="menu-container">
//             <label>Then, choose continent:</label>
//             <Select styles={customStyles}
//             options={continentOptions}
//             onChange={handleContinentChange}
//             isClearable
//             />
//           </div>
//         )}
  
//         {step.includes(1) && geographicArea === 'World region' && (
//           <div className="menu-container">
//             <label>Then, choose world region:</label>
//             <Select styles={customStyles}
//             options={regionOptions}
//             onChange={handleRegionChange}
//             isClearable
//             />
//           </div>
//         )}
  
//         {step.includes(2) && (
//           <div className="menu-container">
//             <label>Now, choose animal category:</label>
//             <Select styles={customStyles}
//             options={[{value : 'All', label : 'All'}, ...animalOptions]}
//             onChange={handleAnimalChange}
//             isClearable
//             />
//           </div>
//         )}
  
//         {step.includes(3) && animal.includes('Large Ruminants') && (
//           <div className="menu-container">
//             <label>Then, choose one or more large ruminants:</label>
//             <Select styles={customStyles}
//             options={largeRuminantsOptions}
//             onChange={(selectedOptions) => handleSpecificAnimalChange('Large Ruminants', selectedOptions)}
//             isMulti
//             />
//             <button onClick={() => setStep([...step, 4])}>Next</button>
//           </div>
//         )}
        
//         {step.includes(3) && animal.includes('Small Ruminants') && (
//           <div className="menu-container">
//             <label>Then, choose one or more small ruminants:</label>
//             <Select styles={customStyles}
//             options={smallRuminantsOptions}
//             onChange={(selectedOptions) => handleSpecificAnimalChange('Small Ruminants', selectedOptions)}
//             isMulti
//             />
//             <button onClick={() => setStep([...step, 4])}>Next</button>
//           </div>
//         )}
  
//         {step.includes(4) && (
//           <div className="menu-container">
//             <label>Last, what disease do you want to check? Choose one or more:</label>
//             <Select styles={customStyles}
//             options={diseaseOptions}
//             onChange={handleDiseaseChange}
//             isMulti
//             />
//             <button onClick={handleViewData}>See Data</button>
//           </div>
//         )}
//         </div>

//         {step.includes(5) && (
//         <div className="menu-container">
//         <DataTable  styles={customStyles}
//           geographicArea={geographicArea}
//           continent={continent}
//           region={region}
//           animal={animal}
//           diseases={diseases}
//           smallRuminants={smallRuminants}
//           largeRuminants={largeRuminants}
//         />
//         </div>
//       )}
//       </>
//     );
//   };
  
//   const DataTable = ({ geographicArea, continent, region, animal, diseases, smallRuminants, largeRuminants }) => {
//     let animalList = []
//     if (animal.includes('All')) {
//       animalList = [...largeRuminants, ...smallRuminants, 'Pigs'];
//     } else {
//       if (animal.includes('Pigs')) {
//         animalList.push('Pigs');
//       }
//       if (animal.includes('Large Ruminants')) {
//         animalList = [...animalList, ...largeRuminants];
//       }
//       if (animal.includes('Small Ruminants')) {
//         animalList = [...animalList, ...smallRuminants];
//       }
//     }
//     // Render data only when all necessary selections are made
//     if (geographicArea && (continent || region || geographicArea === 'Country' || geographicArea === 'Whole World') && animalList.length > 0  && diseases.length > 0) {
//       return (
//         <div className="data-container">
//           <h4>Data Table</h4>
//           <table>
//             <thead>
//               <tr>
//                 <th>{geographicArea !== 'Country' ? 'Area' : 'Country'}</th>
//                 <th>Disease</th>
//                 <th>Animals</th>
//                 <th>Cases</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{geographicArea === 'Country' ? 'Country' : (continent || region || 'Whole World')}</td>
//                 <td>{diseases.join(', ')}</td>
//                 <td>{animalList.join(', ')}</td>
//                 <td>0</td> {/* To replace with actual data retrieval logic */}
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       );
//     } else {
//       return (
//         <div className="data-container">
//           <p>No data available for the selected options.</p>
//         </div>
//       )
//     }
//   };
  
//   export default TablesOption;