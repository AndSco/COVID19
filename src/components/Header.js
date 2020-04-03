import React from "react";
import {formatDate} from "../utils/functions";
import TopMenu from "./TopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faChartLine, faGlobeEurope } from "@fortawesome/free-solid-svg-icons";

const TitleSection = props => {
  const { latestDataDate, goToChronWithoutCountrySelected } = props;
  const date = formatDate(latestDataDate);
  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div id="title">
        <h2 style={Styles.margin}>{`#COVID19 update`}</h2>
        <h5>{`Latest data available: ${date}`}</h5>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faGlobeEurope}
          style={{ ...Styles.icon, ...Styles.iconMargin }}
          size="2x"
          onClick={goToChronWithoutCountrySelected}
        />
        <FontAwesomeIcon
          icon={faChartLine}
          style={{ ...Styles.icon, ...Styles.iconMargin }}
          size="2x"
        />
        <FontAwesomeIcon icon={faChartBar} style={Styles.icon} size="2x" />
      </div>
    </div>
  );
}

const Header = (props) => {
  const {
    dataParameter,
    changeParameter,
    showingNow,
    latestDataDate,
    goToChronWithoutCountrySelected
  } = props;
  
  return (
    <header>
      <TitleSection
        latestDataDate={latestDataDate}
        goToChronWithoutCountrySelected={goToChronWithoutCountrySelected}
      />
      {showingNow === "worldMap" && (
        <TopMenu
          dataParameter={dataParameter}
          changeParameter={changeParameter}
        />
      )}
    </header>
  );
}

const Styles = {
  margin: {
    marginRight: 30
  },
  icon: {
    cursor: "pointer",
    color: "white"
  },
  iconMargin: {
    marginRight: ".4em"
  }
};

export default Header;