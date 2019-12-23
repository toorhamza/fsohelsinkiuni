import React, { useState, useEffect } from "react";
import axios from 'axios';

const FinalOutput = ({ check, filteredData, output }) => {

    const [showCheck, setShowCheck] = useState(false);
    const [index, setIndex] = useState(null);

    const handleOnClick = (i) => {
        setShowCheck(true);
        setIndex(i);
    }
    
  if (check) {
    return output;
  } else if (output.length === 1) {
    return (
      <>
        <h1>{output[0].name}</h1>
        <br />
        <p>Capital: {output[0].capital}</p>
        <p>Population: {output[0].population}</p>
        <br />
        <h2>Languages</h2>
        <ul>
          {output[0].languages.map(lang => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img src={output[0].flag} alt="flag" />
      </>
    );
  } else {
      const final = output.map((country, i) => (
        <div key={country.name}>
          {country.name}
          <input type="button" value="Show" onClick={() => handleOnClick(i)} />
        </div>))
    return (

        <>
    {final}
    {showCheck ? <Show output={output} i={index}/> : null}
</>
    );
  }
};

const Show = ({output, i}) => {
// The weather part is still incomplete
    const [temp, setTemp] = useState({});
    const city = output[i].capital;
    const api_key = "";
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1691935687f0f54aeecc176b544aab88`)
    .then((res) => setTemp(res.data))


    return(
        <>
        <h1>{output[i].name}</h1>
        <br />
        <p>Capital: {output[i].capital}</p>
        <p>Population: {output[i].population}</p>
        <br />
        <h2>Languages</h2>
        <ul>
            {output[0].languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={output[i].flag} alt="flag"/>
        <br />
<h2>Temperature: {temp.main.temp}</h2>

        <div></div>
        </>
    )
}



export default FinalOutput;
