import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import Like from "./Like";
import Comment from "./Comment";

interface IPost {
  key: string;
  postId: string;
  username: string;
  body: string;
  comments: any[];
  likes: [];
  createdAt: string;
}

function Post(props: IPost) {
  const classes = useStyles();
  const { username, body, comments, likes, createdAt, postId } = props;

  console.log(comments);
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Avatar>{username.slice(0, 2).toUpperCase()}</Avatar>}
        title={
          <Typography gutterBottom variant="h5" component="h2">
            {username}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.date}
          >
            {createdAt}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="h5" component="p">
          {body}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Like likesProp={likes} postId={postId} />
        <Comment commentsProp={comments} postId={postId} />
        <Button variant="contained" color="secondary">
          {" "}
          delete
        </Button>
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
    marginBottom: 20,
    border: "1px solid blue"
  },
  media: {
    height: 140
  },
  date: {
    color: "blue"
  },
  cardHeader: {
    margin: 0,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 5
  }
});
export default Post;
