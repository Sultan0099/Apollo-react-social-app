import React, { useContext } from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";

import { useQuery } from "@apollo/react-hooks";

import { FETCH_USER } from "../query";
import { AuthContext } from "../context/Authcontext";

function ProfileComp() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { id: user.id }
  });

  if (loading) return <p> loading...</p>;

  console.log(data);
  return (
    <Paper className={classes.paper}>
      <Typography variant="h2"> {data.user.name} </Typography>
      <Typography variant="body1"> {data.user.username} </Typography>
      <Divider />
      <Typography variant="h6"> email : {data.user.email}</Typography>
      <Typography variant="h6">
        Total Post : {data.user.posts.length}{" "}
      </Typography>
      <Divider />
      <Button
        type="button"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        <BorderColorTwoToneIcon style={{ marginRight: 5, width: 15 }} />
        create Post
      </Button>
    </Paper>
  );
}

const useStyles = makeStyles({
  paper: {
    padding: 20,
    position: "fixed"
  },
  button: {
    marginTop: 5
  }
});

export default ProfileComp;