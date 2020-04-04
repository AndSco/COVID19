import React from "react";
import {formatTableHeader} from "../utils/functions";

const MenuItem = props => {
  const { dataParameter, changeParameter, label } = props;
  const isSelected = dataParameter === label;
  return (
    <div className="menu-item">
      <h6
        onClick={() => changeParameter(label)}
        style={{
          color: isSelected ? "white" : "",
          margin: 0,
          backgroundColor: isSelected ? "#f80759" : "white",
          border: "1px solid #CACFD2"
        }}
      >
        {formatTableHeader(label)}
      </h6>
    </div>
  );
};

const TopMenu = props => {
  const { dataParameter, changeParameter } = props;

  return (
    <div style={Styles.menuContainer}>
      <div id="top-menu">
        <MenuItem
          label="totalCases"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
        <MenuItem
          label="activeCases"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
        <MenuItem
          label="deaths"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
        <MenuItem
          label="recovered"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
        <MenuItem
          label="totalCasesMillionPop"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
        <MenuItem
          label="activeCasesMillPop"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
        <MenuItem
          label="newActiveCases"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
        <MenuItem
          label="newDeaths"
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
      </div>
    </div>
  );
};

const Styles = {
  menuContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "3em",
    // backgroundColor: "#D6F1F3",
    color: "#282c34",
    position: "absolute",
    zIndex: 10,
    top: "5em"
  }
};

export default TopMenu;
