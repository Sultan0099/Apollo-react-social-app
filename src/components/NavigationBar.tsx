import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const NavigationBar = (props: any) => {
  const classes = useStyles();

  const { username, logout } = props;

  function handleClick() {
    logout();
    props.history.push("/login");
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className={classes.title}
          >
            {username.toUpperCase()}
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 50
  },

  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white"
  }
}));

export default NavigationBar;
