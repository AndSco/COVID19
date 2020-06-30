import React from "react";
import { filterResultsByDate } from "../utils/functions";

const FilterOption = ({changeTimeFilteredData, timeUnit, text, isSelected, changeTimeFilter}) => {
  return (
    <h5 style={{cursor: "pointer", color: isSelected ? "white" : "grey"}} onClick={() => {
      changeTimeFilteredData(timeUnit);
      // changeTimeFilter(timeUnit);
    }}>
      {text}
  </h5>
  )
}

const TimeFilters = ({ changeTimeFilteredData, currentTimeFilter }) => {
  return (
    <div style={Styles.container}>
      <h3>Filter by period</h3>
      <FilterOption
        text="Since 1st case"
        timeUnit="fromBeginning"
        isSelected={currentTimeFilter === "fromBeginning"}
        changeTimeFilteredData={changeTimeFilteredData}
        // changeTimeFilter={changeTimeFilter}
      />
      <FilterOption
        text="Past week"
        timeUnit="pastWeek"
        isSelected={currentTimeFilter === "pastWeek"}
        changeTimeFilteredData={changeTimeFilteredData}
        // changeTimeFilter={changeTimeFilter}
      />
      <FilterOption
        text="Past month"
        timeUnit="pastMonth"
        isSelected={currentTimeFilter === "pastMonth"}
        changeTimeFilteredData={changeTimeFilteredData}
        // changeTimeFilter={changeTimeFilter}
      />
    </div>
  );
};

const Styles = {
  container: {
    display: "flex",
    flexDirection: "column", 
    alignItems: "flex-end"
  }
}

export default TimeFilters;