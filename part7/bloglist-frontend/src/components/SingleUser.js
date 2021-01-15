import React, { useEffect } from "react";
import userService from "../services/users";
import {useRouteMatch } from "react-router-dom"
 
const SingleUser = ({ user, handleLogout }) => {
  const [users, setUsers] = React.useState(null);
  let match = useRouteMatch("/users/:id");
  const currentUser = users ? users.find(element => element.id == match.params.id) : null

  console.log(match.params.id)



  useEffect(() => {
    userService.getAllUsers().then((res) => setUsers(res));
  }, []);

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <h2>{currentUser ? currentUser.name: null}</h2>
      <h3>added Blogs</h3>
      <ul>
      {currentUser ? (currentUser.blogs instanceof Array) ? currentUser.blogs.map(i => <li>{i.title}</li>) :null: null}
      </ul>
    </div>
  );
};

export default SingleUser;
