import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [max, setMax] = useState(0);

  const random = () => {
    const randnum = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(randnum);
  };

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    const maxnum = copy.indexOf(Math.max(...copy))
    setVotes(copy);
    setMax(maxnum) //sets index of the highest voted anecdote which is used to fetch it in return.
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <button onClick={vote}>vote</button>
      <button onClick={random}>random anecdote</button>

      <h1>Most Voted Anecdote</h1>
      {props.anecdotes[max]}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
