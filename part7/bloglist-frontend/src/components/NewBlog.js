import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    inputField: {
      margin: theme.spacing(1),
    },
  },
}));

const NewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const classes = useStyles();

  const handleNewBlog = (event) => {
    event.preventDefault();

    props.createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <TextField className={classes.inputField}
          id="outlined-helperText"
          label="Author"
          variant="outlined"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField className={classes.inputField}
          id="outlined-helperText"
          label="Title"
          variant="outlined"
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField className={classes.inputField}
          id="outlined-helperText"
          label="Url"
          variant="outlined"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button
          style={{ margin: "6px" }}
          color="primary"
          variant="contained"
          id="create"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default NewBlog;
