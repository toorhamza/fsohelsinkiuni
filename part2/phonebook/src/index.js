import React, { useState } from "react";
import ReactDOM from "react-dom";
import Form from './Form.js';
import People from './People.js';
import FilterSearch from "./FilterSearch.js";


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterNames, setFilterNames] = useState(persons);

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
