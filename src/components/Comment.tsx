import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";

import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";

function Comment(): JSX.Element {
  const classes = useStyles();

  return (
    <IconButton size="small" color="primary" className={classes.iconButton}>
      <Badge badgeContent={5} color="secondary" className={classes.badge}>
        <CommentTwoToneIcon />
      </Badge>
    </IconButton>
  );
}

const useStyles = makeStyles({
  iconButton: {
    padding: 8,
    "&:hover": {
      background: "#92C2E7"
    }
  },
  badge: {
    padding: 4
  }
});

export default Comment;
