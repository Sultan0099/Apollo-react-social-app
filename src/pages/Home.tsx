import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import InfiniteScroll from "react-infinite-scroll-component";
import NavigationBar from "../components/NavigationBar";
import Post from "../components/Post";

import { AuthContext } from "../context/Authcontext";
import { useFetchPosts } from "../utils/hooks";

function Home(props: any): JSX.Element {
  const context = useContext(AuthContext);
  const classes = useStyles();

  const { error, posts, formatDate, fetchNextPosts, hasMore } = useFetchPosts();

  if (error) return <h1> error </h1>;

  return (
    <div>
      <NavigationBar
        {...props}
        username={context.user.username}
        logout={context.logout}
      />

      {posts && (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchNextPosts}
          hasMore={hasMore}
          endMessage={<p> End </p>}
          loader={<h4>Loading...</h4>}
        >
          <Grid container className={classes.container}>
            <Grid item xs={7}>
              {posts.map((post: any) => {
                return (
                  <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    body={post.body}
                    comments={post.comment}
                    likes={post.like}
                    createdAt={formatDate(post.createdAt)}
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
        </InfiniteScroll>
      )}
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
