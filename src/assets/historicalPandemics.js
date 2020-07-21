// scratch historical plagues data from https://www.visualcapitalist.com/history-of-pandemics-deadliest/
// const extractHistoricalPandemicData = () => {
//   const table = document.querySelector("#tablepress-833");
//   const rows = table.querySelectorAll("tr");
//   const pandemics = [];
//   rows.forEach((row, index) => {
//     if (index === 0) return;
//     const tds = row.querySelectorAll("td");
//     const plagueObj = {};
//     tds.forEach((td, i) => {
//       switch (i) {
//         case 0:
//           plagueObj.name = td.innerText;
//           break;

//         case 1:
//           plagueObj.period = td.innerText;
//           break;

//         case 2:
//           plagueObj.type = td.innerText;
//           break;

//         case 3:
//           plagueObj.victims = td.innerText;
//           break;

//         default:
//           break;
//       }
//     });

//     const { victims } = plagueObj;
//     plagueObj.numDeaths = victims;
//     let { numDeaths } = plagueObj;

//     if (numDeaths.indexOf("-") !== -1) {
//       let indexToCut = 0;
//       const findIndex = (char) => numDeaths.indexOf(char);
//       const purifyEntry = index => numDeaths.slice(0, index).trim();
//       const splitAndReduce = (purifiedString, multiply = false) =>
//         purifiedString
//           .replace(/,/g, "")
//           .split("-")
//           .map(entry => (multiply ? +entry * 1000000 : +entry))
//           .reduce((a, b) => a + b, 0); 

//       const hasMillions = numDeaths.indexOf("M") !== -1;
//       if (hasMillions) {
//         indexToCut = findIndex("M");
//         const nums = purifyEntry(indexToCut);
//         const sum = splitAndReduce(nums, true);
    
//         plagueObj.numDeaths = sum / 2;
//       } else {
//         indexToCut = findIndex("(");
//         const nums = purifyEntry(indexToCut);
//         console.log("NUMS", nums);
//         const sum = splitAndReduce(nums);
//         console.log("SUM", sum);
  
//         plagueObj.numDeaths = sum / 2;  
//       }
//     } else {
//       const purified = numDeaths
//         .replace(/,/g, "")
//         .replace("M", "000000");
//       plagueObj.numDeaths = +purified;  
//     }

//     pandemics.push(plagueObj);
//   });
//   console.log(pandemics);
//   return pandemics;
// }

export default [
  {
    name: "Antonine Plague",
    period: "165-180",
    type: "Believed to be either smallpox or measles",
    victims: "5M",
    numDeaths: 5000000
  },
  {
    name: "Plague of Justinian",
    period: "541-542",
    type: "Yersinia pestis bacteria / Rats, fleas",
    victims: "30-50M",
    numDeaths: 40000000
  },
  {
    name: "Japanese smallpox epidemic",
    period: "735-737",
    type: "Variola major virus",
    victims: "1M",
    numDeaths: 1000000
  },
  {
    name: "Black Death",
    period: "1347-1351",
    type: "Yersinia pestis bacteria / Rats, fleas",
    victims: "200M",
    numDeaths: 200000000
  },
  {
    name: "New World Smallpox Outbreak",
    period: "1520 – onwards",
    type: "Variola major virus",
    victims: "56M",
    numDeaths: 56000000
  },
  {
    name: "Great Plague of London",
    period: "1665",
    type: "Yersinia pestis bacteria / Rats, fleas",
    victims: "100,000",
    numDeaths: 100000
  },
  {
    name: "Italian plague",
    period: "1629-1631",
    type: "Yersinia pestis bacteria / Rats, fleas",
    victims: "1M",
    numDeaths: 1000000
  },
  {
    name: "Cholera Pandemics 1-6",
    period: "1817-1923",
    type: "V. cholerae bacteria",
    victims: "1M+",
    numDeaths: 1010000
  },
  {
    name: "Third Plague",
    period: "1885",
    type: "Yersinia pestis bacteria / Rats, fleas",
    victims: "12M (China and India)",
    numDeaths: 12000000
  },
  {
    name: "Yellow Fever",
    period: "Late 1800s",
    type: "Virus / Mosquitoes",
    victims: "100,000-150,000 (U.S.)",
    numDeaths: 125000
  },
  {
    name: "Russian Flu",
    period: "1889-1890",
    type: "Believed to be H2N2 (avian origin)",
    victims: "1M",
    numDeaths: 1000000
  },
  {
    name: "Spanish Flu",
    period: "1918-1919",
    type: "H1N1 virus / Pigs",
    victims: "40-50M",
    numDeaths: 45000000
  },
  {
    name: "Asian Flu",
    period: "1957-1958",
    type: "H2N2 virus",
    victims: "1.1M",
    numDeaths: 1100000
  },
  {
    name: "Hong Kong Flu",
    period: "1968-1970",
    type: "H3N2 virus",
    victims: "1M",
    numDeaths: 1000000
  },
  {
    name: "HIV/AIDS",
    period: "1981-present",
    type: "Virus / Chimpanzees",
    victims: "25-35M",
    numDeaths: 30000000
  },
  {
    name: "SARS",
    period: "2002-2003",
    type: "Coronavirus / Bats, Civets",
    victims: "770",
    numDeaths: 770
  },
  {
    name: "Swine Flu",
    period: "2009-2010",
    type: "H1N1 virus / Pigs",
    victims: "200,000",
    numDeaths: 200000
  },
  {
    name: "Ebola",
    period: "2014-2016",
    type: "Ebolavirus / Wild animals",
    victims: "11,000",
    numDeaths: 11000
  },
  {
    name: "MERS",
    period: "2015-Present",
    type: "Coronavirus / Bats, camels",
    victims: "850",
    numDeaths: 850
  }
];
