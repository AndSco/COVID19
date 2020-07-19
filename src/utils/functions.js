export const formatDate = (date = new Date()) => {
  // const today = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const setSectionTitle = showingNow => {
  switch (showingNow) {
    case "worldMap":
      return "World Overview";

    case "chronologicalData":
      return "Chronological Data & Comparison";

    case "tableData":
      return "World table Data";

    case "chartBar":
      return "Top 20 countries";

    case "historicalPandemics":
      return "Pandemics in history";

    default:
      return showingNow;
  }
}

export const sortTableData = (key, array, shouldInvert = false) => {
  if (key === "country") {
    return [...array].sort((a, b) => {
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return shouldInvert ? -1 : 1;
      }
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return shouldInvert ? 1 : -1;
      }
      return 0;
    });
  } else {
    return [...array].sort((a, b) => {
      if (isNaN(a[key])) {
        console.log("GOT IT");
        return 1;
      }
      if (a[key] < b[key]) {
        return shouldInvert ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return shouldInvert ? 1 : -1;
      }
      return 0;
    });
  }
};


export const sortData = (key, array, shouldInvert = false) => {
  if (key === "Country") {
    return [...array].sort((a, b) => {
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return shouldInvert ? -1 : 1;
      }
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return shouldInvert ? 1 : -1;
      }
      return 0;
    })
  } 
  
  else if (key === "Date of 1st case") {
    return [...array].sort((a, b) => {
      if (new Date(`${a[key]} 2020`) > new Date(`${b[key]} 2020`)) {
        return shouldInvert ? -1 : 1;
      }
      if (new Date(`${a[key]} 2020`) < new Date(`${b[key]} 2020`)) {
        return shouldInvert ? 1 : -1;
      }
      return 0;
    });
  } 
  
  else {
    return [...array].sort((a, b) => {
      if (a[key] < b[key]) {
        return shouldInvert ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return shouldInvert ? 1 : -1;
      }
      return 0;
    });
  }
}



const keyValuesNotToAlter = ["Province/State", "Country/Region", "Lat", "Long"];

export const chronologicalDataUtils = {
  makeIntegersOfChronologicalData: (obj) => {
    const newObj = { ...obj };
    for (let [key, value] of Object.entries(newObj)) {
      if (keyValuesNotToAlter.indexOf(key) === -1) {
        newObj[key] = +value;
      } else {
        newObj[key] = value;
      }
    }  
    return newObj;
  },

  formatDataByCountry: (dataSet) => {
    const uniqueCountries = Array.from(new Set(dataSet.map(entry => entry["Country/Region"])));
    
    const finalData = [];

    uniqueCountries.forEach(country => {
      const objectToReturn = {};
      objectToReturn.country = country;

      const commonCountryData = dataSet.filter(entry => entry["Country/Region"] === country);

      for (let [key] of Object.entries(commonCountryData[0])) {
        if (keyValuesNotToAlter.indexOf(key) === -1) {
          objectToReturn[key] = commonCountryData
            .map(entry => entry[key])
            .reduce((acc, curr) => acc + curr);
        }
      }
      finalData.push(objectToReturn);
    })
    return finalData;
  },

  createUniqueDataset: (obj) => {
    const countries = Array.from(
      new Set(obj.total.map(entry => entry.country))
    );
    
    const finalData = [];

    const withoutCountry = obj => {
      let objectToReturn = {};
      for (let [key, value] of Object.entries(obj)) {
        if (key !== "country") {
          objectToReturn[key] = value;
        }
      }
      return objectToReturn;
    };
    
    countries.forEach(country => {
      const objectToReturn = {country};
      objectToReturn.totalCases = obj.total
        .filter(entry => entry.country === country)
        .map(entry => withoutCountry(entry))[0];
      objectToReturn.deaths = obj.deaths
        .filter(entry => entry.country === country)
        .map(entry => withoutCountry(entry))[0];
      objectToReturn.recovered = obj.recovered
        .filter(entry => entry.country === country)
        .map(entry => withoutCountry(entry))[0];  

      finalData.push(objectToReturn);
    })
    return finalData;
  }
}

export const formatTableHeader = rawHeader => {
  switch (rawHeader) {
    case "totalCases":
      return "Total cases";

    case "activeCases":
      return "Active cases";

    case "totalCasesMillionPop":
      return "Total/1 million";

    case "activeCasesMillPop":
      return "Active/1 million";

    case "newActiveCases":
      return "New active cases";

    case "newRecovered":
      return "New recovered";

    case "newDeaths":
      return "New deaths";

    case "deathsMillPop":
      return "Deaths/1 million";

    case "recoveredMillPop":
      return "Recovered/1 million";

    default:
      return rawHeader.charAt(0).toUpperCase() + rawHeader.slice(1);
  }
}

export const fixCountryNames = name => {
  switch (name) {
    case "S. Korea":
      return "South Korea";

    case "USA":
      return "United States";

    case "US":
      return "United States";

    case "Korea, South":
      return "South Korea";

    case "Holy See":
      return "Vatican City";

    case "Taiwan*":
      return "Taiwan";

    case "Congo (Kinshasa)":
      return "DR Congo";

    case "Congo (Brazzaville)":
      return "Congo";

    case "Cruise Ship":
      return "Diamond Princess";

    case "Cote d'Ivoire":
      return "Ivory Coast";

    case "The Bahamas":
      return "Bahamas";

    case "Gambia, The":
      return "Gambia";

    case "UK":
      return "United Kingdom";

    case "Czechia":
      return "Czech Republic";

    case "UAE":
      return "United Arab Emirates";

    case "North Macedonia":
      return "Macedonia";

    case "DRC":
      return "DR Congo";

    case "Macao":
      return "Macau";

    case "Faeroe Islands":
      return "Faroe Islands";

    case "R&eacute;union":
      return "Réunion";

    case "St. Barth":
      return "Saint Barthélemy";

    case "St. Vincent Grenadines":
      return "Saint Vincent and the Grenadines";

    default:
      return name;
  }
}


export const getWorldTotalsHopkinsData = allData => {
  const totals = {};
  const [totalCases, activeCases, deaths, recovered] = [
    "totalCases",
    "activeCases",
    "deaths",
    "recovered"
  ].map(key =>
    allData.map(entry => {
      const lastIndex = entry[key].length - 1;
      return entry[key][lastIndex];
    })
  );

  const reference = allData[0].activeCases;
  const yesterday = reference[reference.length - 2].date.getTime();

  const getDataFromDayBefore = (key) => {
    return allData
      .map(entry => entry[key])
      .map(array => array.filter(item => item.date.getTime() === yesterday)[0])
      .filter(val => val !== undefined)
      .reduce((acc, curr) => acc + curr.cases, 0);
  }
  
  const activeCasesDayBefore = getDataFromDayBefore("activeCases");
  const deathsDayBefore = getDataFromDayBefore("deaths");
  const recoveredDayBefore = getDataFromDayBefore("recovered");  

  const [worldTotalCases, worldActiveCases, worldDeaths, worldRecovered] = [
    totalCases,
    activeCases,
    deaths,
    recovered
  ].map(dataSet =>
    dataSet.reduce((totalValue, current) => totalValue + current.cases, 0)
  );

  totals.country = "World total";
  totals.population = 7775017690;
  totals.totalCases = worldTotalCases;
  totals.activeCases = worldActiveCases;
  totals.newActiveCases = worldActiveCases - activeCasesDayBefore;
  totals.deaths = worldDeaths;
  totals.newDeaths = worldDeaths - deathsDayBefore;
  totals.recovered = worldRecovered;
  totals.newRecovered = worldRecovered - recoveredDayBefore;

  // console.log("TOT OBJECT", totals);
  return totals;
};

export const addCommas = num => {
  num += ""; //convert it to string
  var x = num.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};



const filterHelper = (earliestTimeStamp, data) => {
  return data.filter(item => item.date.getTime() >= earliestTimeStamp);
}

export const filterResultsByDate = (periodFrom, dataObject) => {
  const filteredEntries = [];
  dataObject.forEach(country => {
    const {
      activeCases,
      activeCasesMillPop,
      dailyDeaths,
      dailyRecovered,
      deaths,
      deathsMillPop,
      recovered,
      recoveredMillPop,
      totalCases,
      totalCasesMillionPop
    } = country;

    const earliestTimeStamp =
      periodFrom === "pastWeek"
        ? new Date().getTime() - 604800000 - 86400000 // need to subtract one day (data is one day behind)
        : new Date().getTime() - 2419200000 - 86400000;

    filteredEntries.push({
      ...country,
      activeCases: filterHelper(earliestTimeStamp, activeCases),
      activeCasesMillPop: filterHelper(earliestTimeStamp, activeCasesMillPop),
      dailyDeaths: filterHelper(earliestTimeStamp, dailyDeaths),
      dailyRecovered: filterHelper(earliestTimeStamp, dailyRecovered),
      deaths: filterHelper(earliestTimeStamp, deaths),
      deathsMillPop: filterHelper(earliestTimeStamp, deathsMillPop),
      recovered: filterHelper(earliestTimeStamp, recovered),
      recoveredMillPop: filterHelper(earliestTimeStamp, recoveredMillPop),
      totalCases: filterHelper(earliestTimeStamp, totalCases),
      totalCasesMillionPop: filterHelper(earliestTimeStamp, totalCasesMillionPop)
    });
  })

  return filteredEntries;
}