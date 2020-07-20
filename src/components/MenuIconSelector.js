import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faListUl } from "@fortawesome/free-solid-svg-icons";

const MenuIconSelector = ({onCLickFunction, icon}) => {
  return (
    <div style={styles.iconContainer} onClick={onCLickFunction}>
      <FontAwesomeIcon icon={icon === "list" ? faListUl : faCalendarAlt} size="2x" color="#525050" />
    </div>
  );
}

const styles = {
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    // marginLeft: "1rem"
  }
};

export default MenuIconSelector;