import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import InfiniteScrollComp from "../components/InfiniteScroll";

import NavigationBar from "../components/NavigationBar";
import ProfileComp from "../components/ProfileComp";

import { AuthContext } from "../context/Authcontext";

function Home(props: any): JSX.Element {
  const context = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div>
      <NavigationBar
        {...props}
        username={context.user.username}
        logout={context.logout}
      />

      <Grid container className={classes.container}>
        <Grid item xs={7}>
          <InfiniteScrollComp />
        </Grid>
        <Grid item xs={4}>
          <ProfileComp userId={context.user.id} />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    width: "71%",
    marginTop: 100,
    margin: "0px auto"
  },
  profileContainer: {
    position: "fixed"
  }
});

export default Home;
