import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Like from "./Like";
import Comment from "./Comment";

interface IPost {
  key: string;
  id: string;
  username: string;
  body: string;
  comments: [];
  likes: [];
  createdAt: string;
}

function Post(props: IPost) {
  const classes = useStyles();
  const { username, body, comments, likes, createdAt } = props;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {username}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.date}
        >
          {createdAt}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Like />
        <Comment />
      </CardActions>
    </Card>
  );
}
const useStyles = makeStyles({
  container: {
    marginTop: 50,
    backgroundColor: "yellow"
  },
  root: {
    maxWidth: 450,
    marginBottom: 20
  },
  media: {
    height: 140
  },
  date: {
    color: "blue"
  }
});
export default Post;
