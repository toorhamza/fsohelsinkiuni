import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);
  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const handleNotification = () => {
    setNotification("Anecdote Added Successfully");
    setTimeout(() => {
      setNotification("");
    }, 10000);
  };

  const routes = (
    <div>
      <Menu />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/addNew">
          <CreateNew addNew={addNew} handleNotification={handleNotification} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
    </div>
  );

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        {notification ? <h4 style={{ color: "red" }}>{notification}</h4> : null}
        {routes}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
