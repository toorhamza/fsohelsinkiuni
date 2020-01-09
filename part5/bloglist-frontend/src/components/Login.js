import React from "react";

const Login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <label>
        Username:
        <input type="text" name="username" value={props.username} onChange={props.handleUsername}/>
      </label>
      <br />
      <label>
        Password:
        <input type="text" name="password" value={props.password} onChange={props.handlePassword}/>
      </label>
      <br />
      <input type="submit" value="login" />
    </form>
  );
};

export default Login;
