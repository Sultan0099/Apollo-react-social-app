import React, { useContext, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import ProfileComp from "../components/ProfileComp";
import Post from "../components/Post";
import NavigationBar from "../components/NavigationBar";

import { FETCH_USER } from "../query";
import { formatDate } from "../utils/helper";
import { AuthContext } from "../context/Authcontext";

function Profile(props: any) {
  const context = useContext(AuthContext);

  const classes = useStyles();

  const { data, loading } = useQuery(FETCH_USER, {
    variables: { id: props.match.params.userId }
  });

  if (!data || loading) return <p> loading ...</p>;

  return (
    <>
      <NavigationBar
        {...props}
        username={context.user.username}
        logout={context.logout}
      />

      <Container className={classes.container}>
        <ProfileComp userId={data.user.id} cardPosition="relative" />

        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {data.user.posts.map((post: any) => (
            <Post
              key={`${post.id}`}
              postId={post.id}
              userId={data.user.id}
              username={post.username}
              body={post.body}
              comments={post.comments}
              likes={post.likes}
              createdAt={formatDate(post.createdAt)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

const useStyles = makeStyles({
  container: {
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "auto"
  }
});

export default Profile;
