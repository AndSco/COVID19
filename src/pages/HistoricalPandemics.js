import React from "react";
import otherPandemics from "../assets/historicalPandemics";
import * as d3 from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { addCommas } from "../utils/functions";


const shortenNumVictims = string => {
  const index = string.indexOf("(");
  if (index > -1) {
    return string.slice(0, index);
  }
  return string;
};

const Skull = props => {
  return (
    <div
      style={{
        padding: props.size / 6, //"2em",
        borderRadius: "50%",
        // backgroundColor: "#8E44AD", //"#E518E8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        // marginBottom: 20
      }}
    >
      <FontAwesomeIcon
        icon={faSkull}
        style={{
          width: props.size,
          height: props.size
        }}
        color="white"
      />
    </div>
  );
};

const HistoricalPandemics = props => {
  const { covidDeaths } = props;
  const covidData = {
    name: "COVID-19",
    period: "2019-Present",
    type: "Coronavirus – Unknown (possibly pangolins)",
    victims: `${addCommas(covidDeaths)}`,
    numDeaths: covidDeaths
  };

  const allPandemics = [...otherPandemics, covidData].sort((a, b) => {
    if (a.numDeaths > b.numDeaths) return -1;
    if (a.numDeaths < b.numDeaths) return 1;
    else return 0;
  });
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: "30px", 
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
              margin: "50px 10px",
              justifyContent: "space-between",
              padding: "2em",
              borderRadius: 40,
              width: 200,
              height: 600 - index * 15
            }}
          >
            <Skull size={scale(pandemic.numDeaths)} />
            <div>
              <h2
                style={{
                  padding: "0.4em 1em"
                }}
              >
                {pandemic.name}
              </h2>
              <p>Period: {pandemic.period}</p>
              <p>Type: {pandemic.type}</p>
            </div>
            <p style={{ fontSize: "1.6em", color: "#E74C3C" }}>
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

const Styles = {
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default HistoricalPandemics;


// import React from "react";
// import otherPandemics from "../assets/historicalPandemics";
// import * as d3 from "d3";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faSkull} from "@fortawesome/free-solid-svg-icons";
// import { addCommas } from "../utils/functions";


// const SideLine = props => {
//   return (
//     <div style={{display: "flex", flexDirection: "column", height: 300, justifyContent: "space-between", alignItems: "center"}}>
//       <div style={{width: 40, height: 40, borderRadius: 20, backgroundColor: "white"}}>
//       </div>  
//       <div style={{width: 2, backgroundColor: "white", flex: 1}}></div>
//       <div style={{width: 40, height: 40, borderRadius: 20, backgroundColor: "white"}}></div>
//     </div>  
//   )
// }

// const shortenNumVictims = string => {
//   const index = string.indexOf("(");
//   if (index > -1) {
//     return string.slice(0, index);
//   }
//   return string;
// }

// const Skull = props => {
//   return (
//     <div
//       style={{
//         padding: props.size / 6, //"2em",
//         borderRadius: "50%",
//         backgroundColor: "#E518E8",//"#8E44AD",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         marginLeft: 60, 
//         alignSelf: "center"
//       }}
//     >
//       <FontAwesomeIcon
//         icon={faSkull}
//         style={{
//           width: props.size,
//           height: props.size
//         }}
//       />
//     </div>
//   );
// }


// const HistoricalPandemics = props => {
//   const { covidDeaths } = props;
//   const covidData = {
//     name: "COVID-19",
//     period: "2019-Present",
//     type: "Coronavirus – Unknown (possibly pangolins)",
//     victims:
//       `${addCommas(covidDeaths)}`,
//     numDeaths: covidDeaths
//   };

//   const allPandemics = [...otherPandemics, covidData].sort((a, b) => {
//     if (a.numDeaths > b.numDeaths) return -1;
//     if (a.numDeaths < b.numDeaths) return 1;
//     else return 0;
//   });
//   const onlyDeaths = allPandemics.map(entry => entry.numDeaths);
//   console.log("DEATHSARR", onlyDeaths);
//   const min = Math.min(...onlyDeaths);
//   const max = Math.max(...onlyDeaths);
//   console.log(max, min)

//   const scale = d3
//     .scaleLinear()
//     .domain([min, max])
//     .range([1, 300]);

//   console.log(scale(153806));  
//   console.log(scale(850));  

//   console.log("ALL PANDe", allPandemics);

//   return (
//     <div
//       style={{
//         display: "flex",
//         // flexDirection: "column",
//         width: "90%", 
//         flexWrap: "wrap",
//         justifyContent: "center",
//         padding: "50px"
//       }}
//     >
//       {allPandemics.map(pandemic => {
//         return (
//           <div
//             key={pandemic.name}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               // margin: "30px 0",
//               justifyContent: "space-between"
//             }}
//           >
//             <div
//               style={{
//                 width: "30%",
//                 textAlign: "left"
//               }}
//             >
//               <h2
//                 style={{
//                   backgroundColor: "white",
//                   color: "#282c34",
//                   padding: "0 1em"
//                 }}
//               >
//                 {pandemic.name} ({pandemic.period})
//               </h2>
//               {/* <p>Period: {pandemic.period}</p> */}
//               <p>Type: {pandemic.type}</p>
//               <p>{pandemic.victims} victims</p>
//             </div>
//             <div style={{ ...Styles.row, width: "20%" }}>
//               <p style={{ fontSize: "1.6em" }}>
//                 {shortenNumVictims(pandemic.victims)}
//               </p>
//             </div>
//             <div style={{ ...Styles.row, width: "40%" }}>
//               <Skull size={scale(pandemic.numDeaths)} />
//             </div>
//             {/* <SideLine /> */}
//           </div>
//         );
//       })}
//       <SideLine />
//     </div>
//   );
// }

// const Styles = {
//   row: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   }
// };

// export default HistoricalPandemics;