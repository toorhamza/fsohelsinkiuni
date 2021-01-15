import React from 'react'
import { Link } from "react-router-dom";


const NavBar = ({user, handleLogout}) => {

  return (
      <div >
          <Link to="/blogs">blogs</Link>
          <Link to="/users">users</Link>
          <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      </div>

  )
}



export default NavBar