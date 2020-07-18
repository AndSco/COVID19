import React from "react";
import OptionsPanel from "../components/OptionsPanel";
import * as d3 from "d3";
import useWindowDimensions from "../utils/useWindowDimensions";


const BarChart = props => {
  const {data, dataParameter, changeParameter} = props;
  const {width, height} = useWindowDimensions();
  const svgWidth = width / 1.2;
  const svgHeight = height / 1.3;
  const svgMargin = 90;
  const svgContainer = React.useRef();

  const currentData = data.map(entry => ({
      country: entry.country,
      cases: entry[dataParameter]
    }
  )).sort((a, b) => 
    a.cases < b.cases ? 1 
    : a.cases > b.cases ? -1
    : 0
  ).slice(0, 20);

  // console.log("DATA", currentData);

  const allCases = currentData.map(entry => entry.cases);
  const maxCases = d3.max(allCases);
  
  const countries = currentData.map(entry => entry.country);

  // console.log("Countries", countries);

  const xScale = d3
    .scaleBand()
    .domain(countries)
    .range([svgMargin, svgWidth - svgMargin])
    .padding(0.2);
  
  const xAxis = d3.axisBottom(xScale);

  const yScale = d3.scaleLinear()
    .domain([0, maxCases])
    .range([svgHeight - svgMargin, svgMargin]);

  const yAxis = d3.axisLeft(yScale);  

 
  React.useEffect(() => {
    if (currentData) {
      // Clear SVG content before loading new ones
      d3.select("#svg").remove();
      const svgBox = d3.select(svgContainer.current);

      svgBox
        .append("svg")
        .attr("id", "svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        // .style("background-color", "white");

      const svg = d3.select("#svg");
      
      svg
        .append("g")
        .attr("transform", `translate(0, ${svgHeight - svgMargin})`)
        .call(xAxis)
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      svg
        .append("g")
        .attr("transform", `translate(${svgMargin}, 0)`)
        .call(yAxis);  
        
      svg
        .selectAll("rect")
        .data(currentData)
        .enter()
        .append("g")
          .attr("class", "rectangle")
          .append("rect")
            .attr("x", d => xScale(d.country))
            .attr("y", d => yScale(d.cases))
            .attr("width", xScale.bandwidth())
            .attr("height", d => svgHeight - yScale(d.cases) - svgMargin)
            .attr("fill", "#AF7AC5")
      

        d3.selectAll(".rectangle")
          .append("text")
          .attr("fill", "white")
          .attr("font-size", ".7em")
          .attr(
            "transform",
            (d, i) =>
              `translate(${xScale(d.country) + 20} , ${yScale(d.cases) -
                8}), rotate(-90)`
          )
          .text(d => d.cases)
      
    }
  }, [currentData, svgHeight, svgWidth, xAxis, xScale, yAxis, yScale])
  
  return (
    <div id="barchart-page" className="page">
      <OptionsPanel
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <div ref={svgContainer}></div>
    </div>
  );
}


export default BarChart;