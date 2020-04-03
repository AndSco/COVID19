import React from "react";
import {formatTableHeader} from "../utils/functions";

const MenuItem = props => {
  const { dataParameter, changeParameter, label } = props;
  const isSelected = dataParameter === label;
  return (
    <div className="menu-item">
      <h6
        onClick={() => changeParameter(label)}
        style={{ color: isSelected ? "#F7D309" : "" }}
      >
        {formatTableHeader(label)}
      </h6>
    </div>
  );
};

const TopMenu = props => {
  const { dataParameter, changeParameter } = props;

  return (
    <div id="top-menu">
      <MenuItem
        label="totalCases"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <MenuItem
        label="activeCases"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <MenuItem
        label="deaths"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <MenuItem
        label="recovered"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <MenuItem
        label="totalCasesMillionPop"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <MenuItem
        label="activeCasesMillPop"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <MenuItem
        label="newActiveCases"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      <MenuItem
        label="newDeaths"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      />
      {/* <MenuItem
        label="Tot Deaths / 1M pop"
        dataParameter={dataParameter}
        changeParameter={changeParameter}
      /> */}
    </div>
  );
};

export default TopMenu;


// import React from "react";

// const MenuItem = props => {
//   const { dataParameter, changeParameter, label } = props;
//   const isSelected = dataParameter === label;
//   return (
//     <div className="menu-item">
//       <h6
//         onClick={() => changeParameter(label)}
//         style={{ color: isSelected ? "#F7D309" : "" }}
//       >
//         {label}
//       </h6>
//     </div>
//   );
// };

// const TopMenu = props => {
//   const { dataParameter, changeParameter } = props;

//   return (
//     <div id="top-menu">
//       <MenuItem
//         label="Total cases"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="New cases"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="Total Deaths"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="New deaths"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="Total recovered"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="Active cases"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="Serious/Critical"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="Tot cases / 1M pop"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//       <MenuItem
//         label="Tot Deaths / 1M pop"
//         dataParameter={dataParameter}
//         changeParameter={changeParameter}
//       />
//     </div>
//   );
// };

// export default TopMenu;
