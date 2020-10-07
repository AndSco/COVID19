import React from "react";
import { MenuItems } from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = ({
  isPageCurrentlyVisited,
  handleClick,
  goToChronWithoutCountrySelected,
  closeMobileMenu
}) => {
  return (
    <div id="mobile-menu">
      <div id="links-container">
        <MenuItems
          isPageCurrentlyVisited={isPageCurrentlyVisited}
          handleClick={handleClick}
          goToChronWithoutCountrySelected={goToChronWithoutCountrySelected}
        />
        <FontAwesomeIcon
          icon={faTimesCircle}
          size="2x"
          onClick={closeMobileMenu}
          id="close-menu"
        />
      </div>
    </div>
  );
};

export default MobileMenu;
