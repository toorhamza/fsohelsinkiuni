import React from 'react'

const LoggedIn = ({ user , handleLogOut }) => {
    return (
        <>
        <h1> User </h1>
        <p>{user.name} is logged in</p>
        <button  onClick={handleLogOut}>Log Out </button>
        <h1> Blogs </h1>
        </>
    )
}

export default LoggedIn