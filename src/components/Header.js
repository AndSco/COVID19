import React from "react";
import {formatDate, setSectionTitle} from "../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faChartLine, faGlobeEurope, faTable } from "@fortawesome/free-solid-svg-icons";

const IconButton = props => {
  const {
    isPageCurrentlyVisited,
    handleClick,
    title,
    pageName,
    icon,
    needsMargin,
    goToChronWithoutCountrySelected
  } = props;
  const highlightColor = "white";
  const nonHighlightedColor = "#D7BDE2";

  const currentColor = isPageCurrentlyVisited(pageName)
          ? highlightColor
          : nonHighlightedColor;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: needsMargin ? "1.3em" : 0,
        color: currentColor, 
      }}
    >
      <h6 style={{ margin: 0 }}>{title}</h6>
      <FontAwesomeIcon
        icon={icon}
        style={{
          ...Styles.icon,
          color: currentColor,
          cursor: isPageCurrentlyVisited(pageName) ? "auto" : "pointer"
        }}
        onClick={() =>
          goToChronWithoutCountrySelected
            ? goToChronWithoutCountrySelected()
            : handleClick(pageName)
        }
      />
    </div>
  );
}


const TitleSection = props => {
  const { latestDataDate, goToChronWithoutCountrySelected, changePage, showingNow } = props;
  const date = formatDate(latestDataDate);
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
        {/* <FontAwesomeIcon icon={faVirus} /> */}
        <h3 style={Styles.margin}>{`#COVID19 update`}</h3>
        <h6 style={Styles.margin}>{`Latest data: ${date}`}</h6>
      </div>
      <h2>-- {setSectionTitle(showingNow).toUpperCase()} --</h2>
      <div style={{ display: "flex" }}>
        <IconButton
          icon={faGlobeEurope}
          pageName={"worldMap"}
          isPageCurrentlyVisited={isPageCurrentlyVisited}
          handleClick={handleClick}
          title="MAP"
          needsMargin={true}
        />
        <IconButton
          icon={faChartLine}
          pageName={"chronologicalData"}
          isPageCurrentlyVisited={isPageCurrentlyVisited}
          goToChronWithoutCountrySelected={goToChronWithoutCountrySelected}
          title="GROWTH"
          needsMargin={true}
        />
        <IconButton
          icon={faChartBar}
          pageName={"chartBar"}
          isPageCurrentlyVisited={isPageCurrentlyVisited}
          handleClick={handleClick}
          title="TOP-20"
          needsMargin={true}
        />
        <IconButton
          icon={faTable}
          pageName={"tableData"}
          isPageCurrentlyVisited={isPageCurrentlyVisited}
          handleClick={handleClick}
          title="TABLE"
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
    color: "white"
  },
  iconMargin: {
    marginRight: ".4em"
  }
};

export default Header;