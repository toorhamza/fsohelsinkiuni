import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// This time all the components were made in single file in index.js on purpose.
// I never coded before like this because I usually keep all components in different files
// so was just testing if it will work or not.

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodUpdate = () => {
    setGood(good + 1);
  };

  const badUpdate = () => {
    setBad(bad + 1);
  };

  const neutralUpdate = () => {
    setNeutral(neutral + 1);
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <FeedbackButtons
        goodUpdate={goodUpdate}
        badUpdate={badUpdate}
        neutralUpdate={neutralUpdate}
      />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

// Exercise 1.10 was a bit difficult to understand so I just used a single Statistic component to match the code shown
// in the example. Of course I can make even more small components for each and every one of the statistic but I don't see
// any use in that and it's just a bunch of extra code for this small app.
const Statistic = props => {
  if (props.text === "good") {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    );
  } else if (props.text === "bad") {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    );
  } else if (props.text === "neutral") {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    );
  } else if (props.text === "all") {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    );
  } else if (props.text === "average") {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    );
  } else if (props.text === "positive") {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    );
  }
};

// child component name Statistics
const Statistics = ({ good, bad, neutral }) => {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (good !== 0 || bad !== 0 || neutral !== 0) {
      setCheck(true);
    }
  }, [good, bad, neutral]);

  const all = good + bad + neutral;

  // good =1, neutral = 0, negative = -1
  const average = (good * 1 + bad * -1) / all;
  const positive = (good / all) * 100 + " %";

  if (check) {
    return (
      <div>
        <h1>Statistics</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Statistic text="good" value={good} />
            </tr>
            <tr>
              <Statistic text="neutral" value={neutral} />
            </tr>
            <tr>
              <Statistic text="bad" value={bad} />
            </tr>
            <tr>
              <Statistic text="all" value={all} />
            </tr>
            <tr>
              <Statistic text="average" value={average} />
            </tr>
            <tr>
              <Statistic text="positive" value={positive} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h1>No Feedback Given!</h1>;
  }
};

const FeedbackButtons = props => {
  return (
    <div>
      <button onClick={props.goodUpdate}>good</button>
      <button onClick={props.neutralUpdate}>neutral</button>
      <button onClick={props.badUpdate}>bad</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
