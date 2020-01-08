import React, { useState } from "react";
import blogsService from '../services/blogs'

const UserSubmittedBlogs = ({ userBlogs, getBlogs }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    cursor: "pointer"
  };
  
  const handleBlogClick = (i) => {
    selectedRow === null ? setSelectedRow(i) : setSelectedRow(null)
  }


  var collapse = { display: "none" };

  const increaseLikes = async (o) => {

    o.likes = o.likes + 1
    console.log(o.likes)
    try {
        await blogsService.updateLikes(o);
        getBlogs();
      } catch (error) {
        console.error(error)
      }

  }

  const deleteBlogPost = async (o) => {
    if(window.confirm("Are you sure?")) {
        try{
            await blogsService.Delete(o)
            getBlogs();
        } catch (error) {
            console.error(error)
        }
    }
    
  }

  if (userBlogs) {
    userBlogs = userBlogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
    return userBlogs.map((o, i) => (
        <div key={o.id}>
      <div onClick={() => handleBlogClick(i)} style={blogStyle} >
        {o.title} | {o.author}</div>
        <div style={selectedRow === i ? null : collapse}>
        <br />
        {o.url} <br />
        {o.likes} likes <button onClick={() => increaseLikes(o)}> like </button><br /> Added by {o.user.name} <br />
        <button onClick={() => deleteBlogPost(o)}> Delete Post </button> 
      </div>
      </div>
    ));
  } else {
    return null;
  }
};

export default UserSubmittedBlogs;
