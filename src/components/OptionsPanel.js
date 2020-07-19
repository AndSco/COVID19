import React, {useState} from "react";
import {formatTableHeader} from "../utils/functions";
import OptionsIcon from "./OptionsIcon";
import "../styles/optionsPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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

const OptionsPanel = ({ dataParameter, changeParameter, scope } ) => {
  const [isOptionPanelVisible, setIsOptionPanelVisible] = useState(false);
  const [showOptionsPerMillion, setIsShowOptionsPerMillion] = useState(false);
  const toggleOptionPanel = () => setIsOptionPanelVisible(!isOptionPanelVisible);
  const closeOptionPanel = () => setIsOptionPanelVisible(false);

  return isOptionPanelVisible ? (
    <div id="container">
      <div id="menu">
        {!showOptionsPerMillion &&
          <>
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

            {scope !== "scatterplot" &&
            <>
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
            </>  
            }
          </>
        }

        {showOptionsPerMillion &&
          <>
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
              label="deathsMillPop"
              dataParameter={dataParameter}
              changeParameter={changeParameter}
              closeOptionPanel={closeOptionPanel}
            />
            <MenuItem
              label="recoveredMillPop"
              dataParameter={dataParameter}
              changeParameter={changeParameter}
              closeOptionPanel={closeOptionPanel}
            />
          </>
        }
  
        <h6 className="options-button" onClick={() => setIsShowOptionsPerMillion(!showOptionsPerMillion)}>
          {showOptionsPerMillion
            ? "See absolute quantities"
            : "See quantities / 1 million population"}
        </h6>

        <FontAwesomeIcon
          icon={faTimesCircle}
          size="2x"
          color="black"
          onClick={closeOptionPanel}
          style={{ cursor: "pointer", alignSelf: "flex-end" }}
        />
      </div>
    </div>
  ) : (
    <OptionsIcon
      sectionShowing={dataParameter}
      toggleOptionPanel={toggleOptionPanel}
      isPanelOpen={isOptionPanelVisible}
    />
  );
};


export default OptionsPanel;
