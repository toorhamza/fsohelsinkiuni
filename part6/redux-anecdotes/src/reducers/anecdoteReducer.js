const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const newAnecdote = (value) => {
  const newAnecdote = {  
        type: "NEW_ANECDOTE",
        data: {
        content: value,
        id: getId(),
        votes:0
  }
  }

  return newAnecdote
}

const addVote = (v) => {
  return v + 1
}

const sortByVotes = (arr) => {
  const sorted = arr.sort((a, b) => a.votes > b.votes ? -1 : b.votes > a.votes ? 1 : 0)
    return sorted
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      // Both method works. Was just testing for pure functions
        const newArray = state.map(o => o.id === action.id ? {...o, votes: addVote(o.votes)} : o)    
        const sortedArray = sortByVotes(newArray)
        return sortedArray
        
     /* const anec = state.find(o => o.id === action.id)
      anec.votes += 1
      console.log(anec)
      const newState = Object.assign(state, anec)
      console.log(newState) 
      return newState; */
      case "NEW_ANECDOTE":
      return state.concat(action.data);
      default:
        return state;
  }
}

const notifcationReducer = (state = "", action) => {
  switch (action.type){
    case "NOTIFICATION":
      return state = action.data;
      default:
        return state;
  }

}

const filterReducer = (state = false, action) => {
  switch (action.type) {
    case "FILTER":
      return state = action.data
     default:
       return state 
  }
} 

export default {
  reducer,
  getId,
  newAnecdote,
  notifcationReducer,
  filterReducer
} 