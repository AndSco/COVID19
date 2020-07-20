import React from "react";
import { formatTableHeader, addCommasToPlainNumbers } from "../utils/functions";

const TooltipContent = props => {
  const {title, label, data, details} = props.content;
  const formatLabel = label => {
    if (label) {
      return formatTableHeader(label);
    }
    return;
  }
 
  return (
    <div>
      <h3 style={Styles.line}>{title}</h3>
      <p style={Styles.line}>{formatLabel(label)}</p>
      <h4 style={Styles.line}>{addCommasToPlainNumbers(data)}</h4>
      {details && <h5 style={Styles.line}>{details}</h5>}
    </div>
  );
}

const Styles = {
  line: {
    margin: 0,
  }
}


export default TooltipContent;