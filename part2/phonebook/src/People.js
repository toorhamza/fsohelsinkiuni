import React from 'react';

const People = (props) => {
    return (
        <>
        {props.filterNames.map(person => (
            <h4 key={person.name}>
              {" "}
              {person.name} - {person.number} - <button onClick={() => props.delete(person.id)}>DELETE</button>
            </h4>
          ))}
          </>
    )
}

export default People;