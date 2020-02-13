import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";

import NavigationBar from "../components/NavigationBar";
import Post from "../components/Post";

import { AuthContext } from "../context/Authcontext";
import { FETCH_ALL_POST } from "../query";

function Home(props: any): JSX.Element {
  const context = useContext(AuthContext);
  const classes = useStyles();

  const { data, loading, error } = useQuery(FETCH_ALL_POST);

  console.log(data, loading);
  return (
    <div>
      <NavigationBar
        {...props}
        username={context.user.username}
        logout={context.logout}
      />
      <Grid container className={classes.container}>
        <Grid item xs={7}>
          {!loading &&
            data.posts.map((post: any) => {
              return (
                <Post
                  key={post.id}
                  id={post.id}
                  username={post.username}
                  body={post.body}
                  comments={post.comment}
                  likes={post.like}
                />
              );
            })}
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <h1> Porfile </h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    width: "71%",
    marginTop: 50,
    margin: "0px auto"
  }
});

export default Home;
