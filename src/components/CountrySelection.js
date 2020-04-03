import React from "react";

const CountrySelection = props => {
  const { allCountries, showDataForAnotherCountry, countriesSelected } = props;

  const isAlreadySelected = countryName => {
    return countriesSelected.indexOf(countryName) !== -1;
  }

  const updateCountriesSelected = (e) => {
    showDataForAnotherCountry(e.target.value);
  }
  return (
    <div id="comparison-select-container">
      <label htmlFor="country-select" id="comparison-select-label">COMPARE TO ANOTHER COUNTRY</label>
      <select name="countries" id="country-select" onChange={updateCountriesSelected}style={{backgroundColor: "white"}}>
        <option value="">--Choose a country--</option>
        {allCountries.map(country => (
          <option value={country} key={country} disabled={isAlreadySelected(country)}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelection;