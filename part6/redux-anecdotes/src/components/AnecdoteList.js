import React from 'react'

const AnecdoteList = ({store}) => {

    const anecdotes = store.getState().anecdote
    const filter = store.getState().filter

    const vote = (id) => {
        const action = {type: "VOTE", id: id}
        store.dispatch(action)
      }

      const notificationAction = (id) => {
        const action = {type: "NOTIFICATION", data: "you voted"}
        store.dispatch(action)

        setTimeout(function(){
          const otherAction = {type: "NOTIFICATION", data: ""}
          store.dispatch(otherAction)

      }, 5000);
      }

      const list = !filter ? anecdotes : filter

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
              <button onClick={() => {vote(anecdote.id)
              notificationAction(anecdote.id)
              }}>vote</button>
            </div>
          </div>
        )}
        </>
    )
}

export default AnecdoteList