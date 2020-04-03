import React from "react";
import {formatTableHeader} from "../utils/functions";

const ContentLine = props => {
  return (
    <div className="summary-item">
      <h5 style={{ margin: 0 }}>{`${props.label}:`}</h5>
      <p style={{ margin: "2px 5px" }}>{props.data}</p>
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

  console.log("CONTENT", content);
  const data = [];

  Object.entries(content)
    .filter(([key, value]) => key !== "country" && key !== "population")
    .map(([key, value]) => data.push(<ContentLine label={formatTableHeader(key)} data={value} key={key} />))

  console.log("DATA", data);  

  // for (let [key, value] of Object.entries(content)) {
  //   if (key === "country") console.log("GOT IT!");
  //   if (key !== "country" && key !== "population") {
  //     data.push(<ContentLine label={formatTableHeader(key)} data={value} key={key} />);
  //   }
  // }

  return (
    <div id="summary-box">
      <h4 id="summary-title">
        {content.country}
      </h4>
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
    textAlign: "center"
  }
};

export default SummaryBox;

// import React from "react";

// const ContentLine = props => {
//   return (
//     <div className="summary-item">
//       <h5 style={{ margin: 0 }}>{`${props.label}:`}</h5>
//       <p style={{ margin: "2px 5px" }}>{props.data}</p>
//     </div>
//   );
// }

// const SummaryBox = props => {
//   const {
//     content,
//     isShowingWorldData,
//     resetSummaryData,
//     prepareCountryChronologicalData
//   } = props;

//   console.log("CONTENT", content);
//   const data = [];
//   for (let [key, value] of Object.entries(content)) {
//     if (content.Country === "Total:") {
//       if (key !== "Date of 1st case" && key !== "Country") {
//         data.push(<ContentLine label={key} data={value} key={key} />);
//       }
//     }  
//     else if (key !== "Country") {
//       data.push(<ContentLine label={key} data={value} key={key} />);
//     } 
//   }

//   return (
//     <div id="summary-box">
//       <h4 id="summary-title">
//         {content.Country === "Total:" ? "World total" : content.Country}
//       </h4>
//       {data.length > 1 ? data : <h5>No data</h5>}
//       {!isShowingWorldData && (
//         <div>
//           {data.length > 1 &&
//             <p
//               style={{ ...Styles.backButton, backgroundColor: "#E518E8" }}
//               onClick={() => prepareCountryChronologicalData(content.Country)}
//             >
//               CHRONOLOGICAL DATA
//             </p>
//           }
//           <p style={Styles.backButton} onClick={resetSummaryData}>
//             BACK TO WORLD DATA
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// const Styles = { 
//   backButton: {
//     cursor: "pointer",
//     background: "#895FC6",
//     padding: 5,
//     color: "white", 
//     fontSize: 14, 
//     width: "100%", 
//     textAlign: "center"

//   }
// }

// export default SummaryBox;