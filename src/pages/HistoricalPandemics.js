// import React from "react";
// import otherPandemics from "../assets/historicalPandemics";
// import * as d3 from "d3";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSkull, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
// import { addCommas } from "../utils/functions";

// const SideLine = props => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center"
//       }}
//     >
//       <div
//         style={{
//           width: 80,
//           height: 80,
//           borderRadius: 40,
//           backgroundColor: "white",
//           position: "fixed"
//         }}
//       >
//         <p style={{ color: "black" }}>Year</p>
//       </div>
//       <div style={{ width: 2, backgroundColor: "white", flex: 1 }}></div>
//     </div>
//   );
// };

// const shortenNumVictims = string => {
//   const index = string.indexOf("(");
//   if (index > -1) {
//     return string.slice(0, index);
//   }
//   return string;
// };

// const Skull = props => {
//   return (
//     <div
//       style={{
//         padding: props.size / 6, //"2em",
//         borderRadius: "50%",
//         // backgroundColor: "#8E44AD", //"#E518E8",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         alignSelf: "center",
//         // marginBottom: 20
//       }}
//     >
//       <FontAwesomeIcon
//         icon={faSkull}
//         style={{
//           width: props.size,
//           height: props.size
//         }}
//         color="white"
//       />
//     </div>
//   );
// };

// const HistoricalPandemics = props => {
//   const { covidDeaths } = props;
//   const covidData = {
//     name: "COVID-19",
//     period: "2019-Present",
//     type: "Coronavirus – Unknown (possibly pangolins)",
//     victims: `${addCommas(covidDeaths)}`,
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
//   console.log(max, min);

//   const scale = d3
//     .scaleLinear()
//     .domain([min, max])
//     .range([1, 200]);

//   console.log(scale(153806));
//   console.log(scale(850));

//   console.log("ALL PANDe", allPandemics);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "center",
//         alignItems: "flex-end",
//         padding: "30px", 
//         backgroundColor: "white"
//       }}
//     >
//       {allPandemics.map((pandemic, index) => {
//         return (
//           <div
//             key={pandemic.name}
//             className="pandemic-card"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               margin: "50px 10px",
//               justifyContent: "space-between",
//               padding: "2em",
//               borderRadius: 40,
//               width: 200,
//               height: 600 - index * 15
//             }}
//           >
//             <Skull size={scale(pandemic.numDeaths)} />
//             <div>
//               <h2
//                 style={{
//                   padding: "0.4em 1em"
//                 }}
//               >
//                 {pandemic.name}
//               </h2>
//               <p>Period: {pandemic.period}</p>
//               <p>Type: {pandemic.type}</p>
//             </div>
//             <p style={{ fontSize: "1.6em", color: "#E74C3C" }}>
//               <FontAwesomeIcon
//                 icon={faSkullCrossbones}
//                 color="#ECF0F1"
//                 style={{ marginRight: 8 }}
//               />
//               {shortenNumVictims(pandemic.victims)}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const Styles = {
//   row: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   }
// };

// export default HistoricalPandemics;


// import React from "react";
// import otherPandemics from "../assets/historicalPandemics";
// import * as d3 from "d3";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faSkull, faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
// import { addCommas } from "../utils/functions";


// const SideLine = props => {
//   return (
//     <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
//       <div style={{width: 80, height: 80, borderRadius: 40, backgroundColor: "white", position: "fixed", }}>
//         <p style={{color: "black"}}>Year</p>
//       </div>  
//       <div style={{width: 2, backgroundColor: "white", flex: 1}}></div>
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

//   const allPandemics = [...otherPandemics, covidData];
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
//     <div style={{display: "flex", padding: 30}}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           width: "90%",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           padding: "50px"
//         }}
//       >
//         {allPandemics.map(pandemic => {
//           return (
//             <div
//               key={pandemic.name}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 marginBottom: 150,
//                 justifyContent: "space-between"
//               }}
//             >
//               <Skull size={scale(pandemic.numDeaths)} />
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

//               <p style={{ fontSize: "1.6em" }}>
//                 <FontAwesomeIcon
//                   icon={faSkullCrossbones}
//                   color="#ECF0F1"
//                   style={{ marginRight: 8 }}
//                 />
//                 {shortenNumVictims(pandemic.victims)}
//               </p>
//               {/* <SideLine /> */}
//             </div>
//           );
//         })}
//       </div>
//       <SideLine />
//     </div>
//   );
// }


// export default HistoricalPandemics;








import React from "react";
import otherPandemics from "../assets/historicalPandemics";
import * as d3 from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { addCommas } from "../utils/functions";
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
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "white",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          position: "fixed"
        }}
      >
        <h3 style={{ color: "black" }}>{props.year}</h3>
      </div>
      <div style={{ width: 2, backgroundColor: "white", flex: 1 }}></div>
    </div>
  );
};

const Selector = props => {
  return <h4 style={{marginRight: "3em", cursor: "pointer"}} onClick={() => props.changeViewType(props.type)}>{props.name}</h4>;
}

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



const ChronologicalView = props => {
  const {allPandemics, scale} = props;
  const [yearShowing, setYearShowing] = React.useState("1000");


  return (
    <div style={{ display: "flex", padding: 30 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          flexWrap: "wrap",
          justifyContent: "center",
          // padding: "50px"
        }}
      >
        {allPandemics.map(pandemic => {
          return (
            <VisibilitySensor key={pandemic.name} onChange={(isVisible) => {
              if (isVisible) {
                setYearShowing(pandemic.period);
              }
              }}>
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
                {/* <p>Period: {pandemic.period}</p> */}
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
}

const HistoricalPandemics = props => {
  const [typeOfView, setTypeOfView] = React.useState("victim");
  const { covidDeaths } = props;
  const covidData = {
    name: "COVID-19",
    period: "2019-Present",
    type: "Coronavirus – Unknown (possibly pangolins)",
    victims: `${addCommas(covidDeaths)}`,
    numDeaths: covidDeaths
  };

  const changeViewType = type => {
    setTypeOfView(type);
  }

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
          backgroundColor: "white",
          color: "#282c34",
          justifyContent: "flex-end"
        }}
      >
        <Selector
          name="BY NUMBER OF VICTIMS"
          changeViewType={changeViewType}
          type="victim"
        />
        <Selector
          name="CHRONOLOGICALLY"
          changeViewType={changeViewType}
          type="time"
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


