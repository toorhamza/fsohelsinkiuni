import React from "react";

const CreateBlog = ({ handleBlogChange, createBlog }) => {
  return (
    <form onSubmit={createBlog}>
      <label>
        Title:
        <input type="text" name="title" onChange={handleBlogChange}/>
      </label>
      <br />
      <label>
        Author:
        <input type="text" name="author" onChange={handleBlogChange}/>
      </label>
      <br />
      <label>
        Url:
        <input type="text" name="url" onChange={handleBlogChange}/>
      </label>
      <br />
      <label>
        Likes:
        <input type="number" name="likes" onChange={handleBlogChange}/>
      </label>
      <br />
      <input type="submit" />
    </form>
  );
};

export default CreateBlog;
