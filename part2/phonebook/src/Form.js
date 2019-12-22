import React from 'react';

const Form = (props) => {
return (
    <form onSubmit={props.handleSubmit}>
    <div>
      name: <input value={props.newName} onChange={props.handleChange} />
      phone Number: <input value={props.number} onChange={props.handleChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
}

export default Form;