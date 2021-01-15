import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  label: {
    color: "white",
    fontSize: "0.9rem"
  }
}));


const NavBar = ({user, handleLogout}) => {
  const classes = useStyles();

  return (
<div className={classes.root}>
<AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Blogs
          </Typography>
          <Link to="/blogs"><Button className={classes.label}>Blogs</Button></Link>
          <Link to="/users"><Button className={classes.label}>Users</Button></Link>
          <Typography className={classes.label}>
          User:  {user.name}
          </Typography>
          <Button className={classes.label} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>


      </div>

  )
}



export default NavBar