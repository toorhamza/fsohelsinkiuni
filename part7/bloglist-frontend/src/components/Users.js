import React, { useEffect } from "react";
import userService from "../services/users";

const Users = ({ user, handleLogout }) => {
  const [users, setUsers] = React.useState(null);

  useEffect(() => {
    userService.getAllUsers().then((res) => setUsers(res));
  }, []);

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <h2>Users</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Blogs</th>
        </tr>
        {users
          ? users.map((user, index) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          : null}
      </table>
    </div>
  );
};

export default Users;
