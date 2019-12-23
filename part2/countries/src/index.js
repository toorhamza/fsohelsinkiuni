import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import FinalOutput from './FinalOutput.js'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [output, setOutput] = useState([]);
  const [check, setCheck] = useState(true); // if true then output is a String. Required for proper output

  const fetchData = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      /*        debugger
        var test = res.data  */

      setCountries(res.data);
    });
  };
  useEffect(fetchData, []);

  const handleChange = e => {
    setSearch(e.target.value);
    setOutput('');
    setOutput(filterSet);
  };

  const filteredData = countries.filter(
    country => country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  const filterSet = () => {
    if (filteredData.length > 10) {
        setCheck(true);
      return "Too many matches, specify another filter";
    } else if (filteredData.length <= 10) {
      // filteredData.map((country) => <div key={country.name}>{country.name}</div>)
      setCheck(false);
      return filteredData;
    } else {
        setCheck(true);
      return "No Country Found!";
    }
  };

 // const finalOutput = check ? output : filteredData.map((country) => <div key={country.name}>{country.name}</div>)
 
  return (
    <>
      <div>find countries <input onChange={handleChange} /></div>
        <FinalOutput check={check} filteredData={filteredData} output={output}/>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
