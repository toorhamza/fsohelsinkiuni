import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import reducer from "./reducers/anecdoteReducer";

const reducers = combineReducers({
    anecdote: reducer.reducer,
    notification: reducer.notifcationReducer,
    filter: reducer.filterReducer
  });

  const store = createStore(
    reducers, applyMiddleware(thunk)
  );
  
export default store