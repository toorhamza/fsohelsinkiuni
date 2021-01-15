import React, { useEffect } from "react";
import userService from "../services/users";
import {useRouteMatch } from "react-router-dom"
import { useSelector } from 'react-redux'

const SingleBlog = ({ user, handleLogout }) => {
  let match = useRouteMatch("/blogs/:id");
  const blogs = useSelector(state => state.blogs)

  const currentBlog = blogs ? blogs.find(element => element.id == match.params.id) : null

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

      
    </div>
  );
};

export default SingleBlog;
