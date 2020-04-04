import React from "react";
import * as d3 from "d3";
import useWindowDimensions from "../utils/useWindowDimensions";
import {useDataMassaging} from "../utils/useDataMassaging";
import Spinner from "../components/Spinner";
import MouseTooltip from "react-sticky-mouse-tooltip";
import TooltipContent from "../components/TooltipContent";
import ChronDataTopPart from "../components/ChronDataTopPart";
import countryColors from "../assets/countryColors";
import {getWorldTotalsHopkinsData} from "../utils/functions";
import CountrySelector from "../components/CountrySelector";


const ScatterPlot = props => {
  const {
    country,
    changePage,
    noCountrySelected,
    goToChronWithCountrySelected
  } = props;
  const [countriesSelected, setCountriesSelected] = React.useState([country]);
  const allChronologicalData = useDataMassaging();
  const [currentData, setCurrentData] = React.useState(null);
  const [topic, setTopic] = React.useState("activeCases");
  const [isShowingFromDayOne, setIsShowingFromDayOne] = React.useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);
  const [tooltipContent, setTooltipContent] = React.useState("");
  const svgContainer = React.useRef();
  const { width } = useWindowDimensions();
  const height = 420;
  const padding = { top: 40, right: width / 10, bottom: 40, left: width / 10 };

   React.useEffect(() => console.log("NOCOUNTRY?", noCountrySelected), [
     noCountrySelected
   ]);

  // Manage adding country for comparison
  const [isCountryListShowing, setIsCountryListShowing] = React.useState(false);
  const openCountryList = () => setIsCountryListShowing(true);
  const closeCountryList = () => setIsCountryListShowing(false);

  React.useEffect(() => console.log("LIST SHOWING?", isCountryListShowing), [isCountryListShowing]);

  // FOR COMPARING BY EPIDEMIC DURATION -
  // set the number of days to find the longest and set the appropriate scale
  const [dayCounts, setDayCounts] = React.useState([]);

  React.useEffect(() => {
    if (currentData) {
      let allDays = [];
      currentData.forEach(set => {
        const days = set[topic].map(entry => entry.daySinceBeginning);
        allDays.push(...days);
      });
      setDayCounts(allDays);
    }
  }, [currentData]);

  // See absolute data or data / 1 mill pop
  const [showPerMillion, setShowPerMillion] = React.useState(false);

  const toggleMillionAbsolute = () => {
    if (showPerMillion) {
      setTopic("activeCases");
    } else {
      setTopic("activeCasesMillPop");
    }
    setShowPerMillion(!showPerMillion);
  };

  React.useEffect(() => {
    if (allChronologicalData) {
      // console.log("ALL CHRON", allChronologicalData);
      getWorldTotalsHopkinsData(allChronologicalData);
      const dataToSet = [];
      countriesSelected.map(country =>
        dataToSet.push(
          ...allChronologicalData.filter(entry => entry.country === country)
        )
      );
      setCurrentData(dataToSet);
    }
  }, [allChronologicalData, countriesSelected]);

  const showDataForAnotherCountry = countryName => {
    setCountriesSelected([...countriesSelected, countryName]);
  };

  const removeCountryData = countryName => {
    const toSet = countriesSelected.filter(entry => entry !== countryName);
    setCountriesSelected(toSet);
  };

  const changeTopic = topic => {
    setTopic(topic);
  };

  const switchChronologicalComparison = () => {
    console.log("COPY?");
    setIsShowingFromDayOne(!isShowingFromDayOne);
  };

  const allCountries = allChronologicalData
    ? allChronologicalData.map(entry => entry.country).sort()
    : undefined;

  React.useEffect(() => {
    if (currentData) {
      console.log("CURRENT DATA", currentData);
      const allDates = [];
      currentData.map(set =>
        set[topic].map(entry => allDates.push(entry.date))
      );
      const earliestDate = d3.min(allDates);
      const latestDate = d3.max(allDates);

      const minDayCount = 1;
      const maxDayCount = d3.max(dayCounts);

      console.log("dayCounts", dayCounts);

      const allCases = [];
      currentData.map(set =>
        set[topic].map(entry => allCases.push(entry.cases))
      );
      const minimumCases = d3.min(allCases);
      const maximumCases = d3.max(allCases);

      const whatToShowOnX = !isShowingFromDayOne ? "date" : "daySinceBeginning";
      console.log("WHAT ON X", whatToShowOnX);

      // Clear SVG content before loading new ones
      d3.select("#svg").remove();

      const xScale = d3
        .scaleTime()
        .domain(
          !isShowingFromDayOne
            ? [earliestDate, latestDate]
            : [minDayCount, maxDayCount]
        )
        .range([padding.left * 2, width - padding.right * 2]);

      const xAxis = d3
        .axisBottom(xScale)
        .ticks(width / 100)
        .tickSize(5)
        .tickFormat(
          !isShowingFromDayOne ? d3.timeFormat("%d-%m") : d3.format("d")
        );

      const yScale = d3
        .scaleLinear()
        .domain([minimumCases, maximumCases])
        .range([height - padding.top * 2, padding.bottom * 2]);

      const yAxis = d3.axisLeft(yScale);

      const svgBox = d3.select(svgContainer.current);

      svgBox
        .append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);
      // .style("background-color", "white");

      const svg = d3.select("#svg");

      svg
        .append("g")
        .attr("transform", `translate(${0}, ${height - padding.bottom * 2})`)
        .attr("id", "x-axis")
        .call(xAxis);

      svg
        .append("g")
        .attr("transform", `translate(${padding.left * 2}, ${0})`)
        .attr("id", "y-axis")
        .call(yAxis);

      currentData.map((set, index) => {
        // Add the line
        svg
          .append("path")
          .datum(set[topic])
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", 1.5)
          .attr(
            "d",
            d3
              .line()
              // .curve(d3.curveBasis) // Just add that to have a curve instead of segments
              .x(d => xScale(d[whatToShowOnX]))
              .y(d => yScale(d.cases))
          );

        svg
          .append("g")
          .selectAll("circle")
          .data(set[topic])
          .enter()
          .append("circle")
          .attr("class", "circle")
          .attr("cx", d => xScale(d[whatToShowOnX]))
          .attr("cy", d => yScale(d.cases))
          .attr("opacity", "0.6")
          .attr("r", width > 800 ? 4.5 : 2)
          .attr("fill", countryColors[index])
          .on("mouseover", (d, i) => {
            const differenceFromDayBefore =
              i === 0 ? "NA" : +(d.cases - set[topic][i - 1].cases).toFixed(2);
            setIsTooltipVisible(true);
            setTooltipContent({
              title: set.country,
              label: !isShowingFromDayOne
                ? d3.timeFormat("%d-%m-%y")(d.date)
                : `DAY ${d.daySinceBeginning}`,
              data: d.cases,
              details:
                i === 0
                  ? `+${d.cases} from day before`
                  : `+${differenceFromDayBefore} from day before (+${(
                      differenceFromDayBefore / d.cases
                    ).toFixed(2)}%)`
            });
          })
          .on("mouseout", () => {
            setTooltipContent("");
            setIsTooltipVisible(false);
          });
      });
    }
  }, [currentData, country, topic, isShowingFromDayOne]);

  if (!allChronologicalData) {
    return <Spinner />;
  }


  return (
    <div
      style={{
        height: "90vh",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "1em"
      }}
    >
      <ChronDataTopPart
        currentData={currentData}
        topic={topic}
        changeTopic={changeTopic}
        changePage={changePage}
        allCountries={allCountries}
        showDataForAnotherCountry={showDataForAnotherCountry}
        removeCountryData={removeCountryData}
        countriesSelected={countriesSelected}
        isShowingFromDayOne={isShowingFromDayOne}
        switchChronologicalComparison={switchChronologicalComparison}
        showPerMillion={showPerMillion}
        toggleMillionAbsolute={toggleMillionAbsolute}
        openCountryList={openCountryList}
      />
      {(isCountryListShowing || noCountrySelected) && (
        <CountrySelector
          allCountries={allCountries}
          showDataForAnotherCountry={showDataForAnotherCountry}
          countriesSelected={countriesSelected}
          closeCountryList={closeCountryList}
          noCountrySelected={noCountrySelected}
          goToChronWithCountrySelected={goToChronWithCountrySelected}
        />
      )}
      <div ref={svgContainer}></div>
      <MouseTooltip
        visible={isTooltipVisible}
        offsetX={-45}
        offsetY={15}
        style={Styles.tooltip}
      >
        <TooltipContent content={tooltipContent} />
      </MouseTooltip>
      {/* <CountrySelection
        allCountries={allCountries}
        showDataForAnotherCountry={showDataForAnotherCountry}
        countriesSelected={countriesSelected}
      /> */}
    </div>
  );
};

const Styles = {
  tooltip: {
    padding: ".6em 1em",
    backgroundColor: "white",
    borderRadius: "10%",
    color: "#282c34",
    border: "2px solid #282c34",
    fontSize: ".7em"
  }
};

export default ScatterPlot;