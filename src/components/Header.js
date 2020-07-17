import React, { useState } from "react";
import {formatDate, setSectionTitle} from "../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faChartLine, faGlobeEurope, faTable, faSkullCrossbones, faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/mobileMenu.css";
import "../styles/navbar.css";
import MobileMenu from "./MobileMenu";


export const MenuItems = ({
  isPageCurrentlyVisited,
  handleClick,
  goToChronWithoutCountrySelected, 
  isMobileMenuOpen
}) => {
  return (
    <>
      <IconButton
        icon={faGlobeEurope}
        pageName={"worldMap"}
        isPageCurrentlyVisited={isPageCurrentlyVisited}
        handleClick={handleClick}
        title="MAP"
        needsMargin={isMobileMenuOpen === false}
      />
      <IconButton
        icon={faChartLine}
        pageName={"chronologicalData"}
        isPageCurrentlyVisited={isPageCurrentlyVisited}
        goToChronWithoutCountrySelected={goToChronWithoutCountrySelected}
        title="GROWTH"
        needsMargin={isMobileMenuOpen === false}
      />
      <IconButton
        icon={faChartBar}
        pageName={"chartBar"}
        isPageCurrentlyVisited={isPageCurrentlyVisited}
        handleClick={handleClick}
        title="TOP-20"
        needsMargin={isMobileMenuOpen === false}
      />
      <IconButton
        icon={faTable}
        pageName={"tableData"}
        isPageCurrentlyVisited={isPageCurrentlyVisited}
        handleClick={handleClick}
        title="TABLE"
        needsMargin={isMobileMenuOpen === false}
      />
      <IconButton
        icon={faSkullCrossbones}
        pageName={"historicalPandemics"}
        isPageCurrentlyVisited={isPageCurrentlyVisited}
        handleClick={handleClick}
        title="PANDEMICS"
      />
    </>
  );
};


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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const { latestDataDate, goToChronWithoutCountrySelected, changePage, showingNow, goHome } = props;
  const date = formatDate(latestDataDate);
  const isPageCurrentlyVisited = pageName => {
    return showingNow === pageName;
  }

  const handleClick = pageName => {
    if (isPageCurrentlyVisited(pageName)) {
      return;
    }
    changePage(pageName);
    closeMobileMenu();
  }

  const handleChronSectionClick = () => {
    goToChronWithoutCountrySelected();
    closeMobileMenu();
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
      {isMobileMenuOpen && (
        <MobileMenu
          isPageCurrentlyVisited={isPageCurrentlyVisited}
          handleClick={handleClick}
          goToChronWithoutCountrySelected={handleChronSectionClick}
          closeMobileMenu={closeMobileMenu}
        />
      )}

      <div id="title" onClick={goHome} style={{ cursor: "pointer" }}>
        {/* <FontAwesomeIcon icon={faVirus} /> */}
        <h3 style={Styles.margin}>{`#COVID19 update`}</h3>
        <h6 style={Styles.margin}>{`Latest data: ${date}`}</h6>
      </div>
      <h2 className="section-title">{setSectionTitle(showingNow).toUpperCase()}</h2>
      <div className="menu-items">
        <MenuItems
          isPageCurrentlyVisited={isPageCurrentlyVisited}
          handleClick={handleClick}
          goToChronWithoutCountrySelected={handleChronSectionClick}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        id="burger-menu"
        onClick={openMobileMenu}
      />
    </div>
  );
}

const Header = (props) => {
  const {
    latestDataDate,
    goToChronWithoutCountrySelected, 
    changePage, 
    showingNow, 
    goHome
  } = props;
  
  return (
    <header>
      <TitleSection
        latestDataDate={latestDataDate}
        changePage={changePage}
        goToChronWithoutCountrySelected={goToChronWithoutCountrySelected}
        showingNow={showingNow}
        goHome={goHome}
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