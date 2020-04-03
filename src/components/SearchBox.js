import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const SearchBox = props => {
  const [input, setInput] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const { filterElements, resetData } = props;

  const handleChange = e => {
    const enteredValue = e.target.value;
    setInput(enteredValue);
    const regex = new RegExp(enteredValue, "gi");
    filterElements(regex);
  }

  const resetSearch = () => {
    setInput("");
    setIsSearching(false);
    resetData();
  }

  React.useEffect(() => {
    if (input.length < 1) {
      setIsSearching(false);
    }
  }, [input]);

  return (
    <div id="input-wrapper">
      <div style={Styles.inputContainer} id="search-input-container">
        <input
          type="text"
          style={Styles.input}
          value={input}
          onChange={handleChange}
          className="search-input"
          onFocus={() => setIsSearching(true)}
        ></input>
        {isSearching && input.length > 0 && (
          <FontAwesomeIcon
            icon={faTimesCircle}
            color="#CACFD2"
            style={{ paddingRight: 4 }}
            onClick={resetSearch}
          />
        )}
        <FontAwesomeIcon
          icon={faSearch}
          color={isSearching ? "#282c34" : "#CACFD2"}
        />
      </div>
    </div>
  );
}

const Styles = {
  inputContainer: {
    padding: "5px 15px",
    borderRadius: 50,
    border: ".6px solid #CACFD2",
    width: 200,
    alignSelf: "flex-end",
    // marginBottom: "1em", 
    display: "flex"
  },
  input: {
    width: "100%",
    border: 0
  }
};

export default SearchBox;