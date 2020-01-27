import React from 'react'
import { connect } from 'react-redux'
import { vote, setNotification, notificationRemover } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
/* const AnecdoteList = ({store}) => { */

  const anecdotes = props.anecdotes
  const filter = props.filter

  console.log(anecdotes)

  /*   const anecdotes = store.getState().anecdote
    const filter = store.getState().filter */

      const list = !filter ? anecdotes : filter

      const handleButton = (id, votes, content) => {
        const vo = votes + 1
        
        props.vote(id, content, vo)
        props.setNotification(content, 5)

        
      }

    return (
        <>
        <h2>Anecdotes</h2>
        {list.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleButton(anecdote.id, anecdote.votes, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
        </>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote,
    filter: state.filter,
  }
}


const mapDispatchToProps = {
  vote,
  setNotification,
  notificationRemover
}
 

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes