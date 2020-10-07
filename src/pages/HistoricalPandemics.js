import React from "react";
import otherPandemics from "../assets/historicalPandemics";
import * as d3 from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { addCommasToPlainNumbers } from "../utils/functions";
import VisibilitySensor from "react-visibility-sensor";

const SideLine = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: 80,
          height: 60,
          borderRadius: 50,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          textAlign: "center"
        }}
      >
        <h3 style={{ color: "black", margin: 0, fontSize: ".7rem" }}>
          {props.year}
        </h3>
      </div>
      <div style={{ width: 1, backgroundColor: "white", flex: 1 }}></div>
    </div>
  );
};

const Selector = props => {
  const isSelected = props.showingNow === props.type;
  const isVictims = props.type === "victim";
  return (
    <h4
      style={{
        marginRight: "3em",
        cursor: "pointer",
        fontSize: isSelected ? "1.1em" : ".8em",
        color:
          isSelected && isVictims
            ? "black"
            : isSelected && !isVictims
            ? "white"
            : "grey"
      }}
      onClick={() => props.changeViewType(props.type)}
    >
      {props.name}
    </h4>
  );
};

const Skull = props => {
  return (
    <FontAwesomeIcon
      icon={faSkull}
      style={{
        width: props.size,
        height: props.size
      }}
      color="white"
    />
  );
};

const shortenNumVictims = string => {
  const index = string.indexOf("(");
  if (index > -1) {
    return string.slice(0, index);
  }
  return string;
};

const ChronologicalView = ({ allPandemics, scale }) => {
  const [yearShowing, setYearShowing] = React.useState("1000");

  return (
    <div style={{ display: "flex", padding: 30 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {allPandemics.map(pandemic => {
          return (
            <VisibilitySensor
              key={pandemic.name}
              onChange={isVisible => {
                if (isVisible) {
                  setYearShowing(pandemic.period);
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 150,
                  justifyContent: "center",
                  height: "60vh"
                }}
              >
                <Skull size={scale(pandemic.numDeaths)} />
                <h2
                  style={{
                    backgroundColor: "white",
                    color: "#282c34",
                    padding: "0 1em"
                  }}
                >
                  {pandemic.name}
                </h2>
                <p>Type: {pandemic.type}</p>

                <p style={{ fontSize: "1.6em" }}>
                  <FontAwesomeIcon
                    icon={faSkullCrossbones}
                    color="#ECF0F1"
                    style={{ marginRight: 8 }}
                  />
                  {shortenNumVictims(pandemic.victims)}
                </p>
              </div>
            </VisibilitySensor>
          );
        })}
      </div>
      <SideLine year={yearShowing} />
    </div>
  );
};

const VictimView = props => {
  const { allPandemics, scale } = props;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: "30px",
        backgroundColor: "white"
      }}
    >
      {allPandemics.map((pandemic, index) => {
        return (
          <div
            key={pandemic.name}
            className="pandemic-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "10px",
              justifyContent: "space-between",
              padding: "2em",
              borderRadius: 40,
              width: 200,
              height: 420 - index * 12
            }}
          >
            <Skull size={scale(pandemic.numDeaths)} />
            <div>
              <h3
                style={{
                  padding: "0.4em 1em",
                  margin: 0
                }}
              >
                {pandemic.name}
              </h3>
              <p>Period: {pandemic.period}</p>
              <p>Type: {pandemic.type}</p>
            </div>
            <p style={{ fontSize: "1.6em", color: "#E74C3C", margin: 0 }}>
              <FontAwesomeIcon
                icon={faSkullCrossbones}
                color="#ECF0F1"
                style={{ marginRight: 8 }}
              />
              {shortenNumVictims(pandemic.victims)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const HistoricalPandemics = ({ covidDeaths }) => {
  const [typeOfView, setTypeOfView] = React.useState("victim");
  const covidData = {
    name: "COVID-19",
    period: "2019-Present",
    type: "Coronavirus – Unknown (possibly pangolins)",
    victims: `${addCommasToPlainNumbers(covidDeaths)}`,
    numDeaths: covidDeaths
  };

  const changeViewType = type => {
    setTypeOfView(type);
  };

  const allPandemics = [...otherPandemics, covidData];

  const onlyDeaths = allPandemics.map(entry => entry.numDeaths);
  console.log("DEATHSARR", onlyDeaths);
  const min = Math.min(...onlyDeaths);
  const max = Math.max(...onlyDeaths);
  console.log(max, min);

  const scale = d3
    .scaleLinear()
    .domain([min, max])
    .range([1, 200]);

  console.log(scale(153806));
  console.log(scale(850));

  console.log("ALL PANDe", allPandemics);

  return (
    <div>
      <div
        style={{
          display: "flex",
          backgroundColor: typeOfView === "victim" ? "white" : "#282c34",
          color: "#282c34",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <Selector
          name="BY NUMBER OF VICTIMS"
          changeViewType={changeViewType}
          type="victim"
          showingNow={typeOfView}
        />
        <Selector
          name="CHRONOLOGICALLY"
          changeViewType={changeViewType}
          type="time"
          showingNow={typeOfView}
        />
      </div>
      {typeOfView === "victim" ? (
        <VictimView
          scale={scale}
          allPandemics={allPandemics.sort((a, b) => b.numDeaths - a.numDeaths)}
        />
      ) : (
        <ChronologicalView scale={scale} allPandemics={allPandemics} />
      )}
    </div>
  );
};

export default HistoricalPandemics;
