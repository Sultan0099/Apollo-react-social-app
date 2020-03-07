import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import DeletePost from "./DeletePost";
import { IPost } from "../utils/interface";

interface IPostActivity extends IPost {
  isUserCreatedPost: boolean;
}

function PostActivityMenu(props: IPostActivity): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.isUserCreatedPost ? (
          <DeletePost postId={props.postId} setAnchorEl={setAnchorEl} />
        ) : null}

        <MenuItem onClick={handleClose}>Edit Post</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default PostActivityMenu;
