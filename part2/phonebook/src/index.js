import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Form from './Form.js';
import People from './People.js';
import FilterSearch from "./FilterSearch.js";
import axios from 'axios';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterNames, setFilterNames] = useState(persons);

  const fetchData = () => {
    axios.get('http://localhost:3001/persons')
    .then((data) => {
        setPersons(data.data)
        setFilterNames(data.data)
    })
}

  useEffect(fetchData, [])



  const handleSubmit = e => {
    e.preventDefault();
    const checkName = obj => obj.name === newName;

    if (!persons.some(checkName)) {
      const newPersonObject = {
        name: newName,
        number: number
      };
      setPersons(persons.concat(newPersonObject));
      setFilterNames(filterNames.concat(newPersonObject))
      // The method below also works
      //setPersons([...persons, newPersonObject]);
      setNewName("");
      setNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNumber("");
    }

  };

  const handleChange = e => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.target.value);
  };

  const filterName = (e) => {
    setFilterNames(persons.filter(person => person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSearch filterName={filterName}/>
      <h2>add a new user</h2>
    <Form handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} number={number} handleChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
    <People filterNames={filterNames} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
