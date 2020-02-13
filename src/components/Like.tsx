import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";

import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";

function Like() {
  const classes = useStyles();
  const [like, setLike] = useState<boolean>(false);

  function likePost() {
    console.log("post liked");
    setLike(!like);
  }

  return (
    <IconButton
      size="small"
      color="primary"
      className={classes.iconButton}
      onClick={likePost}
    >
      <Badge badgeContent={4} color="secondary" className={classes.badge}>
        {like ? <ThumbUpAltRoundedIcon /> : <ThumbUpAltTwoToneIcon />}
      </Badge>
    </IconButton>
  );
}

const useStyles = makeStyles({
  iconButton: {
    padding: 5,
    "&:hover": {
      background: "#92C2E7"
    }
  },
  badge: {
    padding: 4
  }
});

export default Like;
