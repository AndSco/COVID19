import React, { useState } from "react";
import MenuIconSelector from "./MenuIconSelector";



const FilterOption = ({changeTimeFilteredData, timeUnit, text, isSelected, closePanel}) => {
  return (
    <h5 style={{cursor: "pointer", color: isSelected ? "black" : "grey"}} onClick={() => {
      changeTimeFilteredData(timeUnit);
      closePanel();
    }}>
      {text}
  </h5>
  )
}

const TimeFilters = ({ changeTimeFilteredData, currentTimeFilter }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <div id="time-filters-wrapper">
      <MenuIconSelector icon="calendar" onCLickFunction={togglePanel} />
      {isPanelOpen && (
        <div id="time-filters">
          <h3 style={{color: "grey"}}>Filter by period</h3>
          <FilterOption
            text="Since 1st case"
            timeUnit="fromBeginning"
            isSelected={currentTimeFilter === "fromBeginning"}
            changeTimeFilteredData={changeTimeFilteredData}
            closePanel={closePanel}
          />
          <FilterOption
            text="Past week"
            timeUnit="pastWeek"
            isSelected={currentTimeFilter === "pastWeek"}
            changeTimeFilteredData={changeTimeFilteredData}
            closePanel={closePanel}
            // changeTimeFilter={changeTimeFilter}
          />
          <FilterOption
            text="Past month"
            timeUnit="pastMonth"
            isSelected={currentTimeFilter === "pastMonth"}
            changeTimeFilteredData={changeTimeFilteredData}
            closePanel={closePanel}
            // changeTimeFilter={changeTimeFilter}
          />
        </div>
      )}
    </div>
  );
};


export default TimeFilters;