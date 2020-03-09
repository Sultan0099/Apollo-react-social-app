import React, { useState, useContext, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useMutation } from "@apollo/react-hooks";
import { LIKE_POST } from "../mutations";

import { AuthContext } from "../context/Authcontext";
interface ILike {
  likesProp: any[];
  postId: string;
}

type Like = {
  likePost: {
    id: string;
  };
};

function Like(props: ILike) {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<any[]>([]);

  const { likesProp, postId } = props;

  const [likePost, { loading }] = useMutation(LIKE_POST, {
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    const youLiked = likesProp.find(like => like.likedBy === user.username);
    setLikes([...likesProp]);
    if (youLiked) setLike(true);
  }, []);

  async function handleLikePost() {
    try {
      const { data } = await likePost({ variables: { postId } });

      setLikes([...data.likePost.likes]);

      setLike(!like);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <IconButton
      size="small"
      color="primary"
      className={classes.iconButton}
      onClick={handleLikePost}
    >
      {like ? (
        <ThumbUpAltRoundedIcon style={{ width: 24 }} />
      ) : (
        <ThumbUpAltTwoToneIcon style={{ width: 20 }} />
      )}
      <Typography variant="body2" style={{ marginTop: 4, marginLeft: 4 }}>
        {likes.length > 0 && likes.length}
      </Typography>
    </IconButton>
  );
}

const useStyles = makeStyles({
  iconButton: {
    padding: 5,
    borderRadius: 10,
    "&:hover": {
      background: "#92C2E7"
    }
  }
});

export default Like;
