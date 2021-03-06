import React from "react";
import { formatTableHeader, addCommasToPlainNumbers } from "../utils/functions";

const ContentLine = ({ label, data }) => {
  return (
    <div className="summary-item">
      <h5 style={{ margin: 0 }}>{`${label}:`}</h5>
      <p style={{ margin: "2px 5px" }}>{addCommasToPlainNumbers(data)}</p>
    </div>
  );
};

const SummaryBox = props => {
  const {
    content,
    isShowingWorldData,
    resetSummaryData,
    prepareCountryChronologicalData
  } = props;

  const data = [];

  Object.entries(content)
    .filter(([key]) => key !== "country" && key !== "population")
    .map(([key, value]) =>
      data.push(
        <ContentLine label={formatTableHeader(key)} data={value} key={key} />
      )
    );

  return (
    <div id="summary-box">
      <h4 id="summary-title">{content.country}</h4>
      {data.length > 1 ? data : <h5>No data</h5>}
      {!isShowingWorldData && (
        <div>
          {data.length > 1 && (
            <p
              style={{ ...Styles.backButton, backgroundColor: "#E518E8" }}
              onClick={() => prepareCountryChronologicalData(content.country)}
            >
              CHRONOLOGICAL DATA
            </p>
          )}
          <p style={Styles.backButton} onClick={resetSummaryData}>
            BACK TO WORLD DATA
          </p>
        </div>
      )}
    </div>
  );
};

const Styles = {
  backButton: {
    cursor: "pointer",
    background: "#895FC6",
    padding: 5,
    color: "white",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    borderRadius: 20
  }
};

export default SummaryBox;
