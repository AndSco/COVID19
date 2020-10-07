import React from "react";
import {
  sortTableData,
  formatTableHeader,
  addCommasToPlainNumbers
} from "../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountDown,
  faSortAmountDownAlt,
  faExchangeAlt
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../components/SearchBox";
import "../styles/table.css";

const tableHeaders = [
  "country",
  "totalCases",
  "activeCases",
  "deaths",
  "recovered",
  "totalCasesMillionPop",
  "activeCasesMillPop",
  "deathsMillPop",
  "recoveredMillPop",
  "newActiveCases",
  "newDeaths"
];

const Table = props => {
  const { virusData } = props;
  const [isSortedBy, setIsSortedBy] = React.useState("totalCases");
  const [data, setData] = React.useState(sortTableData(isSortedBy, virusData));
  const [wholeDataSet] = React.useState(virusData);
  const [isSortedMaxMin, setIsSortedMaxMin] = React.useState(true);
  const { prepareCountryChronologicalData } = props;

  const createTableCells = obj => {
    let cells = [];
    for (let [key, value] of Object.entries(obj)) {
      const class_name = key === "country" ? "country-cell" : "";
      cells.push(
        <td key={key} className={class_name}>
          {value
            ? key === "country"
              ? value
              : addCommasToPlainNumbers(value)
            : "NA"}
        </td>
      );
    }
    return (
      <tr
        key={obj.country}
        onClick={() => {
          prepareCountryChronologicalData(obj.country);
        }}
      >
        {cells}
      </tr>
    );
  };

  const isSortedByValue = value => {
    return value === isSortedBy;
  };

  const shouldReverseSorting = value => {
    return isSortedByValue(value) && isSortedMaxMin;
  };

  const filterElements = regex => {
    const filtered = wholeDataSet.filter(entry => entry.country.match(regex));
    setData(filtered);
  };

  const resetData = () => {
    setData(wholeDataSet);
  };

  return (
    <div id="table-container">
      <p style={{ fontSize: ".9em" }}>
        Sort countries by clicking on the table headers or find a country in the
        search bar. Then click on a country to see its chronological data.
      </p>
      <SearchBox filterElements={filterElements} resetData={resetData} />
      <div id="table-wrapper">
        <table>
          <thead>
            <tr>
              {tableHeaders.map((header, i) => (
                <th
                  key={i}
                  className={i === 0 ? "country-cell" : ""}
                  style={{
                    color: isSortedBy === header ? "#E518E8" : ""
                  }}
                >
                  <h4
                    onClick={() => {
                      setIsSortedBy(header);
                      setIsSortedMaxMin(
                        isSortedByValue(header) ? !isSortedMaxMin : true
                      );
                      setData(
                        sortTableData(
                          header,
                          data,
                          shouldReverseSorting(header)
                        )
                      );
                    }}
                  >
                    {formatTableHeader(header)}
                    <FontAwesomeIcon
                      icon={
                        isSortedByValue(header)
                          ? isSortedMaxMin
                            ? faSortAmountDown
                            : faSortAmountDownAlt
                          : faExchangeAlt
                      }
                      rotation={isSortedByValue(header) ? undefined : 90}
                      className="sort-icon"
                    />
                  </h4>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map(key => createTableCells(key))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
