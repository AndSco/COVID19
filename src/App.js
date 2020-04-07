import React from 'react';
import './App.css';
import Header from "./components/Header";
import WorldMap from "./pages/WorldMap";
import Table from "./pages/Table";
import SummaryBox from "./components/SummaryBox";
import ScatterPlot from "./pages/ScatterPlot";
import BarChart from "./pages/BarChart";
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
  // For selecting chron section without a country selected yet
  const [noCountrySelected, setNoCountrySelected] = React.useState(false);

  // React.useEffect(() => console.log("NOCOUNTRY?", noCountrySelected), [noCountrySelected]);
  const goToChronWithoutCountrySelected = () => {
    setNoCountrySelected(true);
    changePage("chronologicalData");
  }

  const goToChronWithCountrySelected = () => {
    setNoCountrySelected(false);
    // changePage("chronologicalData");
  };


  React.useEffect(() => {
    if (chronVirusData) {
      const reference = chronVirusData[0].totalCases;
      const lastDataDate = reference[reference.length - 1].date;
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

  const goHome = () => {
    setShowingNow("worldMap");
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
    changePage("chronologicalData");
  }

  const changePage = pageName => {
    setShowingNow(pageName);
  }



  if (data.length < 1) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Header
        showingNow={showingNow}
        latestDataDate={latestDataDate}
        changePage={changePage}
        goToChronWithoutCountrySelected={goToChronWithoutCountrySelected}
        showingNow={showingNow}
      />
      {showingNow === "worldMap" && (
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
            changeSummaryData={changeSummaryData}
            resetSummaryData={resetSummaryData}
            noMoreShowingWorldData={noMoreShowingWorldData}
            indexGeographySelected={indexGeographySelected}
            highlightCountry={highlightCountry}
            dataParameter={dataParameter}
            changeParameter={changeParameter}
            resetSummaryData={resetSummaryData}
          />
        </main>
      )}
      {showingNow === "chronologicalData" && (
        <ScatterPlot
          country={countryChronologicalData}
          changePage={changePage}
          noCountrySelected={noCountrySelected}
          goToChronWithCountrySelected={goToChronWithCountrySelected}
          goHome={goHome}
        />
      )}
      {showingNow === "tableData" && (
        <Table
          virusData={virusData}
          prepareCountryChronologicalData={prepareCountryChronologicalData}
        />
      )}
      {showingNow === "chartBar" && (
        <BarChart
          data={virusData}
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
      )}
    </div>
  );
}

export default App;