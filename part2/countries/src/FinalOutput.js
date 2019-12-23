import React, { useState, useEffect } from "react";
import axios from 'axios';

const FinalOutput = ({ check, filteredData, output }) => {

    const [showCheck, setShowCheck] = useState(false);
    const [index, setIndex] = useState(null);
    const [temp, setTemp] = useState({});


    const handleOnClick = (i) => {
        setShowCheck(true);
        setIndex(i);

        const city = output[i].capital;
        const api_key = "";

        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api_key}`)
        .then((res) => {
            setTemp(res.data) 
        })
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
    {showCheck ? <Show output={output} i={index} temp={temp}/> : null}
</>
    );
  }
};

const Show = ({output, i, temp}) => {
// The weather part is still incomplete
    const temperature = temp.main ? temp.main.temp : 0;
    const wind  = temp.main ? temp.wind.speed : 0;
    const iconcode = temp.main ? temp.weather[0].icon : null;
    const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

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
        <h2>Temperature: {temperature} Celsius</h2>

        <img src={iconurl} alt="weather"></img>

      <h3>Wind: {wind} kph</h3>

        <div></div>
        </>
    )
}



export default FinalOutput;
