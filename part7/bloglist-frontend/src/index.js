import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducers/index'
import {BrowserRouter as Router} from "react-router-dom"

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider></Router>,
  document.getElementById("root")
)