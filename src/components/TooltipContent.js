import React from "react";

const TooltipContent = props => {
  const {title, label, data, details} = props.content;
  return (
    <div>
      <h3 style={Styles.line}>{title}</h3>
      <p style={Styles.line}>{label}</p>
      <h4 style={Styles.line}>{data}</h4>
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