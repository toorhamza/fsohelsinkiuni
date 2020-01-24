import React from 'react'
import anecdoteReducer from '../reducers/anecdoteReducer'


const AnecdoteForm = ({store}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const newAnecdote = anecdoteReducer.newAnecdote(e.target.newAnecdote.value)  
    
        store.dispatch(newAnecdote)
        e.target.newAnecdote.value = ''   
      }

    return (
        <form onSubmit={handleSubmit}>
        <div><input name="newAnecdote"/></div>
        <button>create</button>
      </form>
    )
}

export default AnecdoteForm