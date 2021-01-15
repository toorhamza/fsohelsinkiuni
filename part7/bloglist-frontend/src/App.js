import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import Navbar from "./components/Navbar"


import blogService from "./services/blogs";
import loginService from "./services/login";

import storage from "./utils/storage";
import { Switch, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  delNotification,
  fetchAllBlogs,
  addBlog,
  deleteBlog,
  likeBlog,
  saveUserData,
  logout,
} from "./redux/actions";

const App = () => {
  const dispatch = useDispatch();

  const reduxBlogs = useSelector((state) => state.blogs);
  // const [blogs, setBlogs] = useState([]);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //  const [notification, setNotification] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(fetchAllBlogs(blogs)));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    dispatch(saveUserData(user));
  }, []);

  const notifyWith = (message, type = "success") => {
    dispatch(addNotification({ message, type }));
    /* setNotification({
      message, type
    }) */
    setTimeout(() => {
      dispatch(delNotification());
      /*  setNotification(null) */
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUsername("");
      setPassword("");
      //  setUser(user);
      dispatch(saveUserData(user));
      notifyWith(`${user.name} welcome back!`);
      storage.saveUser(user);
    } catch (exception) {
      notifyWith("wrong username/password", "error");
    }
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      blogFormRef.current.toggleVisibility();
      dispatch(addBlog(newBlog));
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLike = async (id) => {
    const blogToLike = reduxBlogs.find((b) => b.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    };
    await blogService.update(likedBlog);
    dispatch(likeBlog(id, blogToLike));
  };

  const handleRemove = async (id) => {
    const blogToRemove = reduxBlogs.find((b) => b.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    );
    if (ok) {
      await blogService.remove(id);
      dispatch(deleteBlog(id));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    storage.logoutUser();
  };

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification /* notification={notification} */ />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    );
  }

  const loggedInView = () => (
    <>
      <h2>blogs</h2>

      <Notification /* notification={notification}  */ />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {reduxBlogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      ))}
    </>
  );

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <Switch>
      <Route path="/users/:id">
          <SingleUser user={user} handleLogout={handleLogout} />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog user={user} handleLogout={handleLogout} />
        </Route>
        <Route path="/users">
          <Users user={user} handleLogout={handleLogout} />
        </Route>
        <Route path="/">{loggedInView}</Route>
      </Switch>
    </div>
  );
};

export default App;
