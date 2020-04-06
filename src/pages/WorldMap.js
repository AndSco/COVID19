import React from "react";
import * as d3 from "d3";
import { geoEqualEarth, geoPath } from "d3-geo";
import TooltipContent from "../components/TooltipContent";
import MouseTooltip from "react-sticky-mouse-tooltip";
import useWindowDimensions from "../utils/useWindowDimensions";
import MapTopMenu from "../components/TopMenu";


const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2]);

const WorldMap = props => {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);
  const [tooltipContent, setTooltipContent] = React.useState("");
  const { width, height } = useWindowDimensions();

  const {
    data,
    geographies,
    dataParameter,
    changeSummaryData,
    noMoreShowingWorldData,
    indexGeographySelected,
    highlightCountry, 
    changeParameter
  } = props;

  // ZOOM
  const refMap = React.useRef(null);

  React.useEffect(() => {
    const toZoom = d3.select(refMap.current);
    toZoom.call(
      d3
        .zoom()
        .scaleExtent([1, 3])
        .on("zoom", function() {
          toZoom.attr("transform", d3.event.transform);
        })
    );
  });

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  const provideTooltipContent = content => {
    setTooltipContent(content);
  };

  const totalCases = data.map(entry => entry.properties.data[dataParameter]);
  const minCases = d3.min(totalCases);
  const maxCases = d3.max(totalCases);


  const col_range_low = "#EBDEF0";
  const col_range_high = "#4A235A";
  const colorScale = d3
    .scaleLinear()
    .domain([minCases, maxCases])
    .range([col_range_low, col_range_high])
    .interpolate(d3.interpolateLab);

  const handleCountryClick = countryIndex => {
    highlightCountry(countryIndex);
    // console.log("Clicked on country: ", geographies[countryIndex]);
    noMoreShowingWorldData();
    const objectData = geographies[countryIndex].properties.data;
    console.log("SEL country data", objectData);
    const filteredData = Object.keys(objectData)
      .filter(key => key !== "coordinates")
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: objectData[key]
        };
      }, {});
    changeSummaryData(filteredData);
  };

  return (
    <div id="chart-container">
      <MouseTooltip
        visible={isTooltipVisible}
        offsetX={15}
        offsetY={10}
        style={Styles.tooltip}
      >
        <TooltipContent content={tooltipContent} />
      </MouseTooltip>
      <MapTopMenu
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <svg
        width={`${width}px`}
        height={`${height * 0.90}px`}
        viewBox="0 0 800 450"
        id="svg-map"
      >
        <g className="countries" ref={refMap}>
          {geographies.map((d, i) => (
            <path
              key={`path-${i}`}
              fill={
                i === indexGeographySelected
                  ? "#F3ED2B"
                  : geographies[i].properties.data[dataParameter]
                  ? colorScale(geographies[i].properties.data[dataParameter])
                  : "#F8F9F9"
              }
              d={geoPath().projection(projection)(d)}
              className="country"
              stroke="#FFFFFF"
              strokeWidth={0.3}
              onClick={() => handleCountryClick(i)}
              onMouseEnter={() => {
                if (width < 500) {
                  return;
                }
                provideTooltipContent({
                  title: geographies[i].properties.name,
                  label: dataParameter,
                  data: geographies[i].properties.data[dataParameter]
                    ? geographies[i].properties.data[dataParameter]
                    : "N/A"
                });
                showTooltip();
              }}
              onMouseLeave={() => {
                provideTooltipContent("");
                hideTooltip();
              }}
            />
          ))}
        </g>
      </svg>
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

export default WorldMap;

