import React from  "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import {formatTableHeader} from "../utils/functions";

const OptionsIcon = ({sectionShowing, toggleOptionPanel}) => {
  const label = formatTableHeader(sectionShowing);
  return (
    <div style={styles.wrapper} id="options-button">
      <div style={styles.textContainer}>
        <p style={{ margin: 0, paddingRight: ".7rem" }} id="now-showing">
          Now showing:
        </p>
        <h3 style={{ margin: 0 }} id="showing-now">
          {label}
        </h3>
      </div>
      <div style={styles.iconContainer} onClick={toggleOptionPanel}>
        <FontAwesomeIcon icon={faListUl} size="2x" color="#525050" />
      </div>
    </div>
  );
}


const styles = {
  wrapper: {
    position: "absolute", 
    top: 30, 
    right: 50, 
    display: "flex", 
    alignItems: "center"
  },
  textContainer: {
    display: "flex",
    padding: "10px 20px",
    borderRadius: 40, 
    alignItems: "center", 
    background: "linear-gradient(to right, #f80759, #bc4e9c)"
  }, 
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer", 
    marginLeft: "1rem", 
    // zIndex: 1001
  }
};

export default OptionsIcon;