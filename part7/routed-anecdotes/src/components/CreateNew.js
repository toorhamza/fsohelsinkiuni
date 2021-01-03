import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks/index";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();
  var { reset, ...finalContent } = content;
  var { reset, ...finalAuthor } = author;
  var { reset, ...finalInfo } = info;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
    props.handleNotification();
  };

  const handleReset = () => {
      content.reset()
      info.reset()
      author.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...finalContent} />
        </div>
        <div>
          author
          <input {...finalAuthor} />
        </div>
        <div>
          url for more info
          <input {...finalInfo} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>

      </form>
    </div>
  );
};

export default CreateNew;
