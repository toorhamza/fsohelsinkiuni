import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import networkService from '../services'

const AnecdoteForm = (props) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const value = e.target.newAnecdote.value
        props.newAnecdote(value)  

        e.target.newAnecdote.value = '' 
      }

    return (
        <form onSubmit={handleSubmit}>
        <div><input name="newAnecdote"/></div>
        <button>create</button>
      </form>
    )
}

const mapStateToProps = state => {
  return {
    anecdote: state.anecdote
  }
}

const mapDispatchToProps = {
  newAnecdote
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)