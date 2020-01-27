import networkServices from "../services/index";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

export const newAnecdote = value => {
  return async dispatch => {
    const newNote = await networkServices.createNew(value);
    dispatch({
      type: "NEW_NOTE",
      data: {
        content: newNote.content,
        id: newNote.id,
        votes: 0
      }
    });
  };
};

const addVote = v => {
  return v + 1;
};

const sortByVotes = arr => {
  const sorted = arr.sort((a, b) =>
    a.votes > b.votes ? -1 : b.votes > a.votes ? 1 : 0
  );
  return sorted;
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      // Both method works. Was just testing for pure functions
      const newArray = state.map(o =>
        o.id === action.id ? { ...o, votes: addVote(o.votes) } : o
      );
      const sortedArray = sortByVotes(newArray);
      return sortedArray;

    /* const anec = state.find(o => o.id === action.id)
      anec.votes += 1
      console.log(anec)
      const newState = Object.assign(state, anec)
      console.log(newState) 
      return newState; */
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await networkServices.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes
    });
  };
};

const notifcationReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return (state = action.data);
    default:
      return state;
  }
};

// Action

export const vote = (id, content, votes) => {
  return async dispatch => {
    const response = await networkServices.updateVote(id, votes, content);
    dispatch({
      type: "VOTE",
      id: response.data.id
      }
    )};
  };

  export const setNotification = (content, time) => {
    console.log(content)
    console.log(time)
    const sec = time * 1000
    return async dispatch => {
      await dispatch({
        type: "NOTIFICATION", data: `you voted for ${content}` 
       })

       setTimeout(function() {
        dispatch({ type: "NOTIFICATION", data: "" });
    }, sec); 
    }
  }

export const notificationAction = (id, content) => {
  return { type: "NOTIFICATION", data: `you voted for ${content}` };
};

export const notificationRemover = () => {
  return { type: "NOTIFICATION", data: "" };
};

export const filterAction = filterData => {
  return { type: "FILTER", data: filterData };
};

const filterReducer = (state = false, action) => {
  switch (action.type) {
    case "FILTER":
      return (state = action.data);
    default:
      return state;
  }
};

export default {
  reducer,
  getId,
  notifcationReducer,
  filterReducer
};
