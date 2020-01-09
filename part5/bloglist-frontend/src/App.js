import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import loginService from "./services/login";
import blogsService from "./services/blogs";
import CreateBlog from "./components/CreateBlog";
import Message from "./components/Message";
import LoggedIn from "./components/LoggedIn";
import UserSubmittedBlogs from "./components/UserSubmittedBlogs";
import Togglable from "./components/Togglable";
import  { useField } from './hooks/index'


const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });
  const [userBlogs, setUserBlogs] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0
  });

  //Custom Hooks
  let users = useField('text')
  let pass = useField('text')

   // destructuring and taking out reset value for form because it gives warning
   var { reset, ...finalUsers } = users
   var { reset, ...finalPass } = pass

   console.log(finalUsers)
   console.log(finalPass)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const getBlogs = () => {
    blogsService.getAll().then(data => {
      if (user) {
        const arr = data.filter(o => o.user.username === user.username);
        setUserBlogs(arr);
      }
    });
  };

  useEffect(getBlogs, [user]);

  /*  const userOnlyBlogs = blogs.filter(o => o.user.username === user.username)
    setUserBlogs(userOnlyBlogs) */

  const handleUsername = e => setUsername(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleLogin = async e => {
    e.preventDefault();

    console.log(
      `logging in with ${username} username and ${password} password `
    );
      var u = users.value
      var p = pass.value
    try {
      const user = await loginService.login({
        username: u, 
        password: p
      })
      console.log(`${u} and ${p}` )
      users.reset()
      pass.reset()

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogsService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ message: "Wrong Credentials", type: "error" });
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUserBlogs(null);
    setUser(null);
  };

  const handleBlogChange = e => {
    //const { title, author, url, likes } = e.target
    setNewBlog({ ...newBlog, [`${e.target.name}`]: e.target.value });
  };

  const createBlog = async e => {
    e.preventDefault();
    try {
      await blogsService.create(newBlog);
      setMessage({
        message: `${newBlog.title} is added successfully`,
        type: "success"
      });
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 5000);
      getBlogs();
    } catch (error) {
      setMessage({ message: "Some Error Occured", type: "error" });
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 5000);
    }
  };
 
  
  return (
    <>
      <Message Message={message} />
      <h1> Login to Application </h1>
      {user === null ? (
        <form onSubmit={handleLogin}>
        <label>
          Username:
          <input {...finalUsers}/>
        </label>
        <br />
        <label>
          Password:
          <input {...finalPass}/>
        </label>
        <br />
        <input type="submit" value="login" />
      </form>
        /* <Login
          handleLogin={handleLogin}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          username={username}
          password={password}
        /> */
      ) : (
        <LoggedIn user={user} handleLogOut={handleLogOut} />
      )}
      {user !== null ? (
        <Togglable buttonLabel="new blog">
          <CreateBlog
            handleBlogChange={handleBlogChange}
            createBlog={createBlog}
          />
        </Togglable>
      ) : null}
      <h2>User Blogs</h2>
      <UserSubmittedBlogs userBlogs={userBlogs} getBlogs={getBlogs}/>
    </>
  );
};

export default App;
