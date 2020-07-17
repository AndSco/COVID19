import React from "react";
import {formatTableHeader} from "../utils/functions";

const MenuItem = ({ dataParameter, changeParameter, label, closeOptionPanel }) => {
  const isSelected = dataParameter === label;
  return (
    <div className="menu-item">
      <h6
        onClick={() => {
          changeParameter(label);
          closeOptionPanel();
        }}
        style={{
          color: isSelected ? "white" : "",
          margin: "0 10px",
          backgroundColor: isSelected ? "#f8085a" : "white",
          border: "1px solid #CACFD2",
          // maxWidth: 120,
          height: 25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: ".6rem"
        }}
      >
        {formatTableHeader(label)}
      </h6>
    </div>
  );
};

const TopMenu = props => {
  const { dataParameter, changeParameter, closeOptionPanel } = props;


  return (
    <div id="top-menu-container">
      <div id="top-menu">
        <MenuItem
          label="totalCases"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
        <MenuItem
          label="activeCases"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
        <MenuItem
          label="deaths"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
        <MenuItem
          label="recovered"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
        <MenuItem
          label="totalCasesMillionPop"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
        <MenuItem
          label="activeCasesMillPop"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
        <MenuItem
          label="newActiveCases"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
        <MenuItem
          label="newDeaths"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
          closeOptionPanel={closeOptionPanel}
        />
      </div>
    </div>
  );
};


export default TopMenu;
