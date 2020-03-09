import React, { useContext } from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";

import CreatePost from "./CreatePost";

import { AuthContext } from "../context/Authcontext";

import { FETCH_USER } from "../query";

function ProfileComp({
  userId,
  cardPosition
}: {
  userId: string;
  cardPosition?: string;
}) {
  const { user } = useContext(AuthContext);

  const classes = useStyles();
  const { data, loading } = useQuery(FETCH_USER, {
    variables: { id: userId }
  });

  if (loading) return <p> loading...</p>;

  console.log(data);
  return (
    <Paper
      className={
        cardPosition !== "relative" ? classes.paper : classes.paper_relative
      }
    >
      <Typography variant="h2"> {data.user.name} </Typography>
      <Typography variant="body1"> {data.user.username} </Typography>
      <Divider />
      <Typography variant="h6"> email : {data.user.email}</Typography>
      <Typography variant="h6">
        Total Posts : {data.user.posts.length}{" "}
      </Typography>
      <Divider />
      {user.username === data.user.username && <CreatePost userId={userId} />}
    </Paper>
  );
}

const useStyles = makeStyles({
  paper: {
    padding: 20,
    position: "fixed"
  },
  paper_relative: {
    padding: 20,
    position: "relative"
  }
});

export default ProfileComp;
