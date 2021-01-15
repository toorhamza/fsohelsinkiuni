import React, { useState } from "react";
import blogService from "../services/blogs";
import {useRouteMatch } from "react-router-dom"
import { useSelector } from 'react-redux'

const SingleBlog = ({ user, handleLogout }) => {
  const [comment, setComment] = useState(null)
  let match = useRouteMatch("/blogs/:id");
  const blogs = useSelector(state => state.blogs)

  let currentBlog = blogs ? blogs.find(element => element.id == match.params.id) : null

 const handleChange = (e) => {
  setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    blogService.addComment(match.params.id, {comment: comment}).then(setComment(""))
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <h1>{currentBlog ? currentBlog.title: null}</h1>
      <a href={currentBlog? currentBlog.url: null}>{currentBlog ? currentBlog.title: null}</a>
      <p>{currentBlog? currentBlog.likes + " likes" : null}</p>
      <p>{currentBlog? "added by " + currentBlog.author : null}</p>

      <h2>comments</h2>

      <input value={comment} onChange={handleChange} /> <button onClick={handleSubmit}>add a comment</button> 

    <ul>
      {currentBlog ? (currentBlog.comments instanceof Array) ? currentBlog.comments.map(i => <li>{i}</li>) :null: null}
      </ul>      
    </div>
  );
};

export default SingleBlog;
