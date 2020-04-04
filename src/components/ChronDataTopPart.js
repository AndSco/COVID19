import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faTimesCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import countryColors from "../assets/countryColors";

const MenuItem = props => {
  return (
    <h5
      style={{
        cursor: "pointer",
        color: props.value === props.topic ? "#f80759" : "#282c34"
      }}
      onClick={() => props.changeTopic(props.value)}
    >
      {props.label}
    </h5>
  );
};


const CountryLabel = props => {
  const {entryShowing, index, removeCountryData, currentData} = props;
  return (
    <div key={entryShowing.country} style={Styles.headerContainer}>
      <div
        className="country-color-marker"
        style={{
          ...Styles.colorMarker,
          backgroundColor: countryColors[index]
        }}
      ></div>
      <h5 style={{ ...Styles.countryHeader }}>{entryShowing.country}</h5>
      {currentData.length > 1 && (
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ paddingLeft: ".4em", cursor: "pointer" }}
          size="sm"
          onClick={() => removeCountryData(entryShowing.country)}
        />
      )}
    </div>
  );
}


const TopMenu = props => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        padding: "0 0 0 4em"
      }}
      id="graph-top-menu"
    >
      <MenuItem
        value={!props.showPerMillion ? "activeCases" : "activeCasesMillPop"}
        topic={props.topic}
        label={
          !props.showPerMillion ? "ACTIVE CASES" : "ACTIVE CASES/1 MILLION POP"
        }
        changeTopic={props.changeTopic}
      />
      <MenuItem
        value={!props.showPerMillion ? "totalCases" : "totalCasesMillionPop"}
        topic={props.topic}
        label={!props.showPerMillion ? "TOT CASES" : "TOT CASES/1 MILLION POP"}
        changeTopic={props.changeTopic}
      />
      <MenuItem
        value={!props.showPerMillion ? "deaths" : "deathsMillPop"}
        topic={props.topic}
        label={!props.showPerMillion ? "DEATHS" : "DEATHS/1 MILLION POP"}
        changeTopic={props.changeTopic}
      />
      <MenuItem
        value={!props.showPerMillion ? "recovered" : "recoveredMillPop"}
        topic={props.topic}
        label={!props.showPerMillion ? "RECOVERED" : "RECOVERED/1 MILLION POP"}
        changeTopic={props.changeTopic}
      />
      <div id="top-buttons-container" style={{display: "flex"}}>
        <div>
          <h6 onClick={props.toggleMillionAbsolute} style={Styles.optionsButton}>
            {props.showPerMillion
              ? "See absolute quantities"
              : "See quantities / 1 million population"}
          </h6>
        </div>
        {props.currentDataLength > 1 && (
          <div>
            <h6
              onClick={props.switchChronologicalComparison}
              style={Styles.optionsButton}
            >
              {!props.isShowingFromDayOne
                ? "Compare increase since 1st case"
                : "Compare chronologically"}
            </h6>
          </div>
        )}
      </div>  
    </div>
  );
};

const ChronDataTopPart = props => {
  const {
    currentData,
    topic,
    changeTopic,
    changePage,
    removeCountryData,
    switchChronologicalComparison, 
    isShowingFromDayOne, 
    showPerMillion,
    toggleMillionAbsolute, 
    openCountryList
  } = props;

  return (
    <div
      id="graph-intro"
      style={{
        // padding: ".6em 1.5em 0 1.5em",
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div id="graph-intro-top">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "ghostwhite",
            color: "#282c34",
            padding: "0 1.5em"
          }}
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={() => changePage("worldMap")}
          />
          <TopMenu
            topic={topic}
            changeTopic={changeTopic}
            isShowingFromDayOne={isShowingFromDayOne}
            switchChronologicalComparison={switchChronologicalComparison}
            currentDataLength={currentData ? currentData.length : undefined}
            showPerMillion={showPerMillion}
            toggleMillionAbsolute={toggleMillionAbsolute}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "3em",
          flexWrap: "wrap"
        }}
      >
        {currentData &&
          currentData.map((entryShowing, index) => (
            <CountryLabel
              entryShowing={entryShowing}
              index={index}
              key={index}
              currentData={currentData}
              removeCountryData={removeCountryData}
            />
          ))}
        {currentData && (
          <div style={Styles.headerContainer} onClick={openCountryList}>
            <FontAwesomeIcon icon={faPlus} color="grey" />
            <h5
              style={{
                ...Styles.countryHeader,
                color: "grey",
                cursor: "pointer"
              }}
            >
              Add country
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

const Styles = {
  headerContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "3em",
    marginBottom: "1em",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 40,
    color: "#282c34",
    padding: ".3em 1em"
  },
  countryHeader: {
    margin: 0,
    paddingLeft: ".6em"
  },
  colorMarker: {
    width: 12,
    height: 12,
    borderRadius: 15
    // marginLeft: ".5em"
  },
  optionsButton: {
    padding: ".5em .7em",
    border: "1px solid #282c34",
    cursor: "pointer",
    margin: 0,
    marginLeft: "1em"
  }
};

export default ChronDataTopPart;