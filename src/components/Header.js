import React from "react";
import {formatDate, setSectionTitle} from "../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faChartLine, faGlobeEurope, faTable } from "@fortawesome/free-solid-svg-icons";


const TitleSection = props => {
  const { latestDataDate, goToChronWithoutCountrySelected, changePage, showingNow } = props;
  const date = formatDate(latestDataDate);
  const highlightColor = "white";
  const nonHighlightedColor = "#D7BDE2";
  const isPageCurrentlyVisited = pageName => {
    return showingNow === pageName;
  }

  const handleClick = pageName => {
    if (isPageCurrentlyVisited(pageName)) {
      return;
    }
    changePage(pageName);
  }

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
        <h3 style={Styles.margin}>{`#COVID19 update`}</h3>
        <h6 style={Styles.margin}>{`Latest data: ${date}`}</h6>
      </div>
      <h2>-- {setSectionTitle(showingNow).toUpperCase()} --</h2>
      <div>
        <FontAwesomeIcon
          icon={faGlobeEurope}
          style={{
            ...Styles.icon,
            ...Styles.iconMargin,
            color: isPageCurrentlyVisited("worldMap")
              ? highlightColor
              : nonHighlightedColor
          }}
          size="2x"
          onClick={() => handleClick("worldMap")}
        />
        <FontAwesomeIcon
          icon={faChartLine}
          style={{
            ...Styles.icon,
            ...Styles.iconMargin,
            color: isPageCurrentlyVisited("chronologicalData")
              ? highlightColor
              : nonHighlightedColor
          }}
          size="2x"
          onClick={goToChronWithoutCountrySelected}
        />
        <FontAwesomeIcon
          icon={faChartBar}
          style={{
            ...Styles.icon,
            ...Styles.iconMargin,
            color: isPageCurrentlyVisited("chartBar")
              ? highlightColor
              : nonHighlightedColor
          }}
          size="2x"
        />
        <FontAwesomeIcon
          icon={faTable}
          style={{
            ...Styles.icon,
            color: isPageCurrentlyVisited("tableData")
              ? highlightColor
              : nonHighlightedColor
          }}
          size="2x"
          onClick={() => handleClick("tableData")}
        />
      </div>
    </div>
  );
}

const Header = (props) => {
  const {
    latestDataDate,
    goToChronWithoutCountrySelected, 
    changePage, 
    showingNow
  } = props;
  
  return (
    <header>
      <TitleSection
        latestDataDate={latestDataDate}
        changePage={changePage}
        goToChronWithoutCountrySelected={goToChronWithoutCountrySelected}
        showingNow={showingNow}
      />
    </header>
  );
}

const Styles = {
  margin: {
    margin: 0
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