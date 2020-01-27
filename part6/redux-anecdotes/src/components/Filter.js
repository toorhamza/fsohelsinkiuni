import React from 'react'
import { filterAction } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'


const Filter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const keyword = event.target.value
    console.log(keyword)
    const anecdotes = props.anecdote
    const filter = anecdotes.filter(anec => anec.content.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    console.log(filter)
    props.filterAction(filter)
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

const mapStateToProps = state => {
    return {
      anecdote: state.anecdote
    }
  }
  
  const mapDispatchToProps = {
    filterAction
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Filter)