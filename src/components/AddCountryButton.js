import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import countryColors from "../assets/countryColors";



const CountryLabel = props => {
  const { entryShowing, index, removeCountryData, currentData } = props;
  return (
    <div key={entryShowing.country} style={Styles.headerContainer}>
      <div
        className="country-color-marker"
        style={{
          ...Styles.colorMarker,
          backgroundColor: countryColors[index]
        }}
      ></div>
      <h5 style={{ ...Styles.countryHeader, fontSize: ".9em" }}>{entryShowing.country}</h5>
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
};



const AddCountryButton = ({ currentData, removeCountryData, openCountryList  }) => { 
  return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap", 
          maxWidth: "80vw"
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
  );
};

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

export default AddCountryButton;
