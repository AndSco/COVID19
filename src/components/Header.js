import React from "react";
import {formatDate} from "../utils/functions";
import TopMenu from "./TopMenu";

const Header = (props) => {
  const { dataParameter, changeParameter, showingNow, latestDataDate } = props;
  const date = formatDate(latestDataDate);
  return (
    <header>
      <div id="title">
        <h2 style={Styles.margin}>{`#COVID19 update`}</h2>
        <h5 style={Styles.margin}>{`Latest data available: ${date}`}</h5>
      </div>
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
  }
}

export default Header;