import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Form from "./Form.js";
import People from "./People.js";
import FilterSearch from "./FilterSearch.js";
import communicateService from "./services/communicate.js";
import './index.css'
import Notification from './Notification.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterNames, setFilterNames] = useState(persons);
  const [message, setMessage] = useState({message:'', type:''})


  const fetchData = () => {
    communicateService.getAll().then(data => {
      setPersons(data.data);
      setFilterNames(data.data);
    })
    .catch(error => {
      setMessage({message:'Error Occured', type:'error'})
      setTimeout(() => {
        setMessage({message:'', type:''})
      }, 5000) 
    })
  };

  useEffect(fetchData, []);

  const addData = newPersonObject => {
    communicateService.create(newPersonObject)
    .then(response => {
      console.log(response)
      setMessage({message:'Person Added Successfully!', type:'success'})
      setTimeout(() => {
        setMessage({message:'', type:''})
      }, 5000)  ;
    })
    .then (() => fetchData())
    .catch(error => {
      setMessage({message:'Error Occured!', type:'error'})
      setTimeout(() => {
        setMessage({message:'', type:''})
      }, 5000) 
    })
  };

  const deleteData = (id) => {
    if(window.confirm('Are You Sure You Want to Delete?')) {
      communicateService.delete(id)
      .then(response => {
        console.log(response);
        setMessage({message:'Data Deleted Successfully!', type:'success'})
      setTimeout(() => {
        setMessage({message:'', type:''})
      }, 5000)  
      })
      .then (() => fetchData())
      .catch(error => {
        setMessage({message:'Person already deleted! Please Refresh The Page', type:'error'})
        setTimeout(() => {
          setMessage({message:'', type:''})
        }, 5000) 
      })
  }
}


  const updateData = (id, newObject) => {
    communicateService.update(id, newObject)
    .then(response => {
      console.log(response);
      setMessage({message:'Data Updated Successfully!', type:'success'})
        setTimeout(() => {
        setMessage({message:'', type:''})
      }, 5000) 
    })
    .then (() => fetchData())
    .catch (error => console.log(error))
  }

  const handleSubmit = e => {
    e.preventDefault();
    const checkName = obj => obj.name === newName;

    if (!persons.some(checkName)) {
      const newPersonObject = {
        name: newName,
        number: number
      };
      addData(newPersonObject);

      // setPersons(persons.concat(newPersonObject));
      // setFilterNames(filterNames.concat(newPersonObject))
      // The method below also works
      //setPersons([...persons, newPersonObject]);
      setNewName("");
      setNumber("");
    } else {
      window.confirm(`${newName} is already added to phonebook. Replace the old phone number with the new one?`);
      const newPersonObject = {
        name: newName,
        number: number
      };
      const personId = persons.find(person => person.name === newName).id
      updateData(personId, newPersonObject)
      
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

  const filterName = e => {
    setFilterNames(
      persons.filter(
        person =>
          person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification Message={message}/>
      <FilterSearch filterName={filterName} />
      <h2>add a new user</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleChange={handleChange}
        number={number}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <People filterNames={filterNames} delete={deleteData}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
