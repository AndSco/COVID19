import React from 'react';
import './App.css';
import Header from "./components/Header";
import WorldMap from "./components/WorldMap";
import Table from "./components/Table";
import SummaryBox from "./components/SummaryBox";
import ScatterPlot from "./components/ScatterPlot";
import { feature } from "topojson-client";
import Spinner from "./components/Spinner";
import {useDataMassaging} from "./utils/useDataMassaging";
import topoData from "./assets/world-110m";
import { getWorldTotalsHopkinsData } from "./utils/functions";


function App() {
  const [data, setData] = React.useState([]);
  const [worldwideData, setWorldwideData] = React.useState(null);
  const chronVirusData = useDataMassaging();
  const [virusData, setVirusData] = React.useState([]);
  const [summaryData, setSummaryData] = React.useState({});
  const [geographies, setGeographies] = React.useState([]);
  const [dataParameter, setDataParameter] = React.useState("totalCases");
  const [isShowingWorldData, setIsShowingWorldData] = React.useState(true);
  const [indexGeographySelected, setIndexGeographySelected] = React.useState(null);
  const [showingNow, setShowingNow] = React.useState("worldMap");
  const [countryChronologicalData, setCountryChronologicalData] = React.useState(null);
  const [latestDataDate, setLatestDataDate] = React.useState(null);

  React.useEffect(() => {
    if (chronVirusData) {
      const reference = chronVirusData[0].totalCases;
      const lastDataDate = reference[reference.length - 1].date;
      console.log("LAST DAY AVAILABLE", lastDataDate);
      setLatestDataDate(lastDataDate);
    }
  }, [chronVirusData])
  

  
  React.useEffect(() => {
    const getData = async () => {
      const lastDayData = chronVirusData.map(entry => entry.latestData);
      setVirusData(lastDayData);
      const worldData = getWorldTotalsHopkinsData(chronVirusData);
      setWorldwideData(worldData);
      setSummaryData(worldData);
      setGeographies(feature(topoData, topoData.objects.countries).features);
      const finalData = topoData.objects.countries.geometries.map(country => {
        const countryData = lastDayData.find(
          entry => entry.country === country.properties.name
        );

        if (countryData) {
          const filteredData = Object.keys(countryData)
            .filter(key => key !== "Country")
            .reduce((obj, key) => {
              return {
                ...obj,
                [key]: countryData[key]
              };
            }, {});

          country.properties.data = filteredData;
        } else {
          country.properties.data = [];
        }
        return country;
      });
      setData(finalData);
    };

    if (chronVirusData) {
      getData();
    }
  }, [chronVirusData]);

 

  const changeParameter = parameter => {
    setDataParameter(parameter);
  }

  
  const changeSummaryData = obj => {
    setSummaryData(obj);
  }

  const resetSummaryData = () => {
    setIsShowingWorldData(true);
    setSummaryData(worldwideData);
    setIndexGeographySelected(null);
  };

  const noMoreShowingWorldData = () => {
    setIsShowingWorldData(false);
  }

  const highlightCountry = index => {
    setIndexGeographySelected(index);
  }

  const prepareCountryChronologicalData = countryName => {
    setCountryChronologicalData(countryName);
    showChronologicalData();
  }

  const showMap = () => {
    setShowingNow("worldMap");
  }

  const showChronologicalData = () => {
    setShowingNow("chronologicalData");
  }


  if (data.length < 1) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Header
        dataParameter={dataParameter}
        changeParameter={changeParameter}
        showingNow={showingNow}
        latestDataDate={latestDataDate}
      />
      {showingNow === "worldMap" ? (
        <main id="main-section">
          <SummaryBox
            content={summaryData}
            isShowingWorldData={isShowingWorldData}
            resetSummaryData={resetSummaryData}
            prepareCountryChronologicalData={prepareCountryChronologicalData}
          />
          <WorldMap
            data={data}
            geographies={geographies}
            dataParameter={dataParameter}
            changeSummaryData={changeSummaryData}
            resetSummaryData={resetSummaryData}
            noMoreShowingWorldData={noMoreShowingWorldData}
            indexGeographySelected={indexGeographySelected}
            highlightCountry={highlightCountry}
          />
        </main>
      ) : (
        <ScatterPlot country={countryChronologicalData} showMap={showMap} />
      )}
      {showingNow === "worldMap" && (
        <Table
          virusData={virusData}
          prepareCountryChronologicalData={prepareCountryChronologicalData}
        />
      )}
    </div>
  );
}

export default App;





// import React from 'react';
// import './App.css';
// import Header from "./components/Header";
// import WorldMap from "./components/WorldMap";
// import Table from "./components/Table";
// import SummaryBox from "./components/SummaryBox";
// import ScatterPlot from "./components/ScatterPlot";
// import { getVirusWorldData } from "./dbFunctions/data";
// import { feature } from "topojson-client";
// import Spinner from "./components/Spinner";

// ///
// import {useDataMassaging} from "./utils/useDataMassaging";
// import testTopoData from "./assets/world-110m";
// import { getWorldTotalsHopkinsData } from "./utils/functions";
// ///



// function App() {
//   const [data, setData] = React.useState([]);
//   const [worldwideData, setWorldwideData] = React.useState(null);
//   const [virusData, setVirusData] = React.useState(null);
//   const [summaryData, setSummaryData] = React.useState({});
//   const [geographies, setGeographies] = React.useState([]);
//   const [dataParameter, setDataParameter] = React.useState("Total cases");
//   const [isShowingWorldData, setIsShowingWorldData] = React.useState(true);
//   const [indexGeographySelected, setIndexGeographySelected] = React.useState(null);
//   const [showingNow, setShowingNow] = React.useState("worldMap");
//   const [countryChronologicalData, setCountryChronologicalData] = React.useState(null);

//   // SANDBOX
//   const testNewData = useDataMassaging();
//   const [finalTestData, setFinalTestData] = React.useState([]);
//   const [worldTestData, setWorldTestData] = React.useState(null);
//   const [testSummaryData, setTestSummaryData] = React.useState({});

//   console.log("WORLD SUMM", testSummaryData);

//   React.useEffect(() => console.log("THIS IS DATA", data), [data]);
//   React.useEffect(() => console.log("THIS IS WorldWide DATA", worldwideData), [worldwideData]);
//   React.useEffect(() => console.log("THIS IS virus DATA", virusData), [virusData]);
//   React.useEffect(() => console.log("THIS IS summary DATA", summaryData), [
//     summaryData
//   ]);
//   React.useEffect(() => console.log("THIS IS geographies", geographies), [geographies]);

//   React.useEffect(() => {
//     if (testNewData) {
//       const worldData = getWorldTotalsHopkinsData(testNewData);
//       setWorldTestData(worldData);
//       setTestSummaryData(worldData);
//       const finalData = testTopoData.objects.countries.geometries.map(
//         country => {
//           const countryData = testNewData.find(
//             entry => entry.country === country.properties.name
//           );
  
//           if (countryData) {
//             const filteredData = Object.keys(countryData)
//               .filter(key => key !== "Country")
//               .reduce((obj, key) => {
//                 return {
//                   ...obj,
//                   [key]: countryData[key]
//                 };
//               }, {});

//             country.properties.data = filteredData;
//           } else {
//             country.properties.data = [];
//           }
//           return country;
//         }
//       );
//       setFinalTestData(finalData);
//     }
//   }, [testNewData])

//   React.useEffect(() => console.log("WORLD TEST DATA", worldTestData), [worldTestData]);
//   React.useEffect(() => console.log("FINAL TEST DATA", finalTestData), [finalTestData]);


//   //....................




//   const changeParameter = parameter => {
//     setDataParameter(parameter);
//   }

//   const getData = React.useCallback(async () => {
//     const dataRaw = await getVirusWorldData();
//     const { topoData, totalWorldWide, virusData } = dataRaw;
//     setGeographies(feature(topoData, topoData.objects.countries).features);
//     setSummaryData(...totalWorldWide);
//     setWorldwideData(...totalWorldWide);
//     setVirusData(virusData);
//     const dataFromApi = await topoData.objects.countries.geometries;
//     setData(dataFromApi);
//   }, []);

//   const changeSummaryData = obj => {
//     setSummaryData(obj);
//     setTestSummaryData(obj);
//   }

//   const resetSummaryData = () => {
//     setIsShowingWorldData(true);
//     setSummaryData(worldwideData);
//     setIndexGeographySelected(null);
//   };

//   const noMoreShowingWorldData = () => {
//     setIsShowingWorldData(false);
//   }

//   const highlightCountry = index => {
//     setIndexGeographySelected(index);
//   }

//   const prepareCountryChronologicalData = countryName => {
//     setCountryChronologicalData(countryName);
//     showChronologicalData();
//   }

//   const showMap = () => {
//     setShowingNow("worldMap");
//   }

//   const showChronologicalData = () => {
//     setShowingNow("chronologicalData");
//   }


//   React.useEffect(() => {
//     getData();
//   }, [getData]);

//    if (data.length < 1) {
//      return <Spinner />;
//    }

//   return (
//     <div className="App">
//       <Header
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//         showingNow={showingNow}
//       />
//       {showingNow === "worldMap" ? (
//         <main id="main-section">
//           <SummaryBox
//             // content={summaryData}
//             content={testSummaryData}
//             isShowingWorldData={isShowingWorldData}
//             resetSummaryData={resetSummaryData}
//             prepareCountryChronologicalData={prepareCountryChronologicalData}
//           />
//           <WorldMap
//             data={data}
//             geographies={geographies}
//             dataParameter={dataParameter}
//             changeSummaryData={changeSummaryData}
//             resetSummaryData={resetSummaryData}
//             noMoreShowingWorldData={noMoreShowingWorldData}
//             indexGeographySelected={indexGeographySelected}
//             highlightCountry={highlightCountry}
//           />
//         </main>
//       ) : (
//         <ScatterPlot country={countryChronologicalData} showMap={showMap} />
//       )}
//       {showingNow === "worldMap" && (
//         <Table
//           virusData={virusData}
//           testVirusData={testNewData}
//           prepareCountryChronologicalData={prepareCountryChronologicalData}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
