import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";


const CountryLine = props => {
  const {
    countryName,
    showDataForAnotherCountry,
    countriesSelected,
    closeCountryList,
    goToChronWithCountrySelected
  } = props;
  const isAlreadySelected = countryName => {
    return countriesSelected.indexOf(countryName) !== -1;
  };

  const updateCountriesSelected = countryName => {
    showDataForAnotherCountry(countryName);
    if (goToChronWithCountrySelected) {
      console.log("now SHOW");
      goToChronWithCountrySelected();
    };
    closeCountryList();
  };

  return (
    <h5
      style={{
        cursor: "pointer",
        color: isAlreadySelected(props.countryName) ? "grey" : "white"
      }}
      className="country-list-item"
      onClick={() => {
        if (isAlreadySelected(props.countryName)) {
          console.log("already selected");
          return;
        }
        updateCountriesSelected(props.countryName);
      }}
    >
      {props.countryName}
    </h5>
  );
}

const CountrySelector = props => {
  const {
    allCountries,
    showDataForAnotherCountry,
    countriesSelected,
    closeCountryList,
    goToChronWithCountrySelected, 
    noCountrySelected
  } = props;

  const [input, setInput] = React.useState("");
  const [filteredCountries, setFilteredCountries] = React.useState([...allCountries]);
  

  const handleChange = e => {
    const enteredValue = e.target.value;
    setInput(enteredValue);
    const regex = new RegExp(enteredValue, "i");
    const filtered = allCountries.filter(country => country.match(regex));
    setFilteredCountries(filtered);
  }

  return (
    <div style={Styles.box}>
      {!noCountrySelected && (
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="2x"
          style={{ position: "fixed", top: 25, right: 25, cursor: "pointer" }}
          onClick={closeCountryList}
        />
      )}
      <h2 style={{ color: "#FFFF00" }}>Choose a country to visualise data</h2>
      <input
        type="text"
        placeholder="Type country initials"
        style={Styles.input}
        className="search-input"
        value={input}
        onChange={handleChange}
      />

      {filteredCountries.map((country, index) => (
        <CountryLine
          countryName={country}
          key={index}
          showDataForAnotherCountry={showDataForAnotherCountry}
          countriesSelected={countriesSelected}
          closeCountryList={closeCountryList}
          goToChronWithCountrySelected={goToChronWithCountrySelected}
        />
      ))}
    </div>
  );
}

const Styles = {
  box: {
    width: "100vw",
    height: "100vh",
    position: "fixed", 
    top: 0, 
    left: 0,
    backgroundColor: "#282c34",
    overflow: "scroll", 
    padding: "1.5em 0"
  }, 
  input: {
    padding: "1em 2em",
    border: "none",
    borderRadius: 40, 
    width: "20vw"
  }
}

export default CountrySelector;