import React from "react";
import dataUrls from "../assets/dataUrls";
import { chronologicalDataUtils, fixCountryNames } from "./functions";
import * as d3 from "d3";
import populationData from "../assets/populationData";

const trimToFirstCase = array => {
  const firstInstance = array.filter(entry => entry.cases > 0)[0];
  const firstInstanceIndex = array.indexOf(firstInstance);
  return array.slice(firstInstanceIndex).map((entry, index) => {
    entry.daySinceBeginning = index + 1;
    return entry;
  });
};

const getLatestDataForACountry = countryObj => {
  const getLatestDataByKey = key => {
    const arrayInQuestion = countryObj[key];
    const todayIndex = arrayInQuestion.length - 1;
    const toReturn = arrayInQuestion[todayIndex];
    if (!toReturn) {
      return "NA";
    }
    return toReturn.cases;
  };

  const latestData = {};

  const keys = [
    "totalCases",
    "activeCases",
    "deaths",
    "recovered",
    "totalCasesMillionPop",
    "activeCasesMillPop",
    "deathsMillPop",
    "recoveredMillPop"
  ];

  const { newActiveCases, newDeaths, country } = countryObj;
  latestData.country = country;

  keys.map(key => {
    latestData[key] = getLatestDataByKey(key);
    return latestData[key];
  });

  latestData.newActiveCases = newActiveCases;
  latestData.newDeaths = newDeaths;

  return latestData;
};

const getNewCases = (dataSet, key) => {
  const dataArray = dataSet[key];
  if (!dataArray || dataArray.length < 2) {
    return 0;
  }

  const getDayTimeStamp = dayIndexFromLast => {
    return dataArray[dataArray.length - dayIndexFromLast].date.getTime();
  };

  const getValueFromDayIndex = timestamp => {
    return dataArray.filter(item => item.date.getTime() === timestamp)[0].cases;
  };

  const yesterday = getDayTimeStamp(2);
  const today = getDayTimeStamp(1);
  const yesterdayValue = getValueFromDayIndex(yesterday);
  const todayValue = getValueFromDayIndex(today);
  const difference = todayValue - yesterdayValue;
  return difference;
};

export const useDataMassaging = () => {
  const [allChronologicalData, setAllChronologicalData] = React.useState(null);
  const {
    makeIntegersOfChronologicalData,
    formatDataByCountry,
    createUniqueDataset
  } = chronologicalDataUtils;

  React.useEffect(() => {
    const fetchData = () => {
      const promises = [];
      dataUrls.forEach(url => {
        promises.push(
          new Promise((resolve, reject) => {
            d3.csv(url)
              .then(res => resolve(res))
              .catch(err => {
                console.log(err);
                reject(err);
              });
          })
        );
      });

      Promise.all(promises).then(data => {
        const total = formatDataByCountry(
          data[0].map(entry => makeIntegersOfChronologicalData(entry))
        );

        const deaths = formatDataByCountry(
          data[1].map(entry => makeIntegersOfChronologicalData(entry))
        );

        const recovered = formatDataByCountry(
          data[2].map(entry => makeIntegersOfChronologicalData(entry))
        );

        const finalObject = { total, deaths, recovered };
        const finalData = createUniqueDataset(finalObject);
        // console.log("FIN DATA", finalData);

        const finalDataWithRightCountryNames = finalData.map(entry => {
          const [totalCases, deaths, recovered] = [
            entry.totalCases,
            entry.deaths,
            entry.recovered
          ].map(object => {
            return Object.entries(object).reduce((newArr, [key, value]) => {
              const newObj = {};
              newObj.date = new Date(key);
              newObj.cases = value;
              newArr.push(newObj);
              return newArr;
            }, []);
          });

          return {
            country: fixCountryNames(entry.country),
            totalCases: trimToFirstCase(totalCases),
            deaths: trimToFirstCase(deaths),
            recovered: trimToFirstCase(recovered)
          };
        });

        console.log("country names", finalDataWithRightCountryNames);

        //Remove the 2 cruiseliners
        const dataWithoutCruiseLiners = finalDataWithRightCountryNames.filter(
          entry =>
            entry.country !== "Diamond Princess" &&
            entry.country !== "MS Zaandam"
        );

        console.log("NO CRUISE", dataWithoutCruiseLiners);

        //Adds population in millions and active cases + deats / 1million
        dataWithoutCruiseLiners.map(entry => {
          const foundEntry = populationData.filter(
            country => country.country === entry.country
          )[0];
          const population = foundEntry
            ? +foundEntry.population / 1000000
            : undefined;
          entry.population = population;
          entry.totalCasesMillionPop = entry.totalCases.map(entry => {
            return { ...entry };
          });

          entry.totalCasesMillionPop.map(entry => {
            entry.cases = +(entry.cases / population).toFixed(2);
            return entry;
          });

          entry.deathsMillPop = entry.deaths.map(entry => {
            return {
              date: entry.date,
              cases: +(entry.cases / population).toFixed(2),
              daySinceBeginning: entry.daySinceBeginning
            };
          });

          entry.recoveredMillPop = entry.recovered.map(entry => {
            return {
              date: entry.date,
              cases: +(entry.cases / population).toFixed(2),
              daySinceBeginning: entry.daySinceBeginning
            };
          });

          entry.dailyDeaths = entry.totalCases.map(totalEntry => {
            const sameDay = entry.deaths.find(
              deathEntry =>
                deathEntry.date.getTime() === totalEntry.date.getTime()
            );

            return {
              date: totalEntry.date,
              cases: sameDay ? sameDay.cases : 0,
              daySinceBeginning: totalEntry.daySinceBeginning
            };
          });

          entry.dailyRecovered = entry.totalCases.map(totalEntry => {
            const sameDay = entry.recovered.find(
              recoveredEntry =>
                recoveredEntry.date.getTime() === totalEntry.date.getTime()
            );

            return {
              date: totalEntry.date,
              cases: sameDay ? sameDay.cases : 0,
              daySinceBeginning: totalEntry.daySinceBeginning
            };
          });

          entry.activeCases = entry.totalCases.map(totalEntry => {
            const deathsToSubtract = entry.dailyDeaths.find(
              val => val.date === totalEntry.date
            ).cases;
            const recoveredToSubtract = entry.dailyRecovered.find(
              val => val.date === totalEntry.date
            ).cases;

            return {
              date: totalEntry.date,
              cases: totalEntry.cases - deathsToSubtract - recoveredToSubtract,
              daySinceBeginning: totalEntry.daySinceBeginning
            };
          });

          entry.activeCasesMillPop = entry.activeCases.map(entry => {
            return {
              date: entry.date,
              cases: +(entry.cases / population).toFixed(2),
              daySinceBeginning: entry.daySinceBeginning
            };
          });

          entry.newActiveCases = getNewCases(entry, "activeCases");

          entry.newDeaths = getNewCases(entry, "deaths");

          entry.latestData = getLatestDataForACountry(entry);

          return entry;
        });

        setAllChronologicalData(dataWithoutCruiseLiners);
      });
    };

    fetchData();
  }, [
    createUniqueDataset,
    formatDataByCountry,
    makeIntegersOfChronologicalData
  ]);

  return allChronologicalData;
};
