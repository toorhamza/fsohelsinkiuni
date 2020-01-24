import React from 'react'

const Filter = ({store}) => {

    const filterAction = (filterData) => {
        const action = {type: "FILTER", data: filterData}
        store.dispatch(action)
      }
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const keyword = event.target.value
    console.log(keyword)
    const anecdotes = store.getState().anecdote
    const filter = anecdotes.filter(anec => anec.content.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    console.log(filter)
    filterAction(filter)
  }
  const style = {
    marginBottom: 10
  }

  

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter