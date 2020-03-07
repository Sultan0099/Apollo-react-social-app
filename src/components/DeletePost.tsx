import React from "react";

import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { useMutation } from "@apollo/react-hooks";

import { DELETE_POST } from "../mutations";
import { SET_POST_CLIENT } from "../utils/typeDefsClient";

function DeletePost(props: { postId: string; setAnchorEl: any }) {
  const classes = useStyles();

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy, data) {
      const prevData: any = proxy.readQuery({
        query: SET_POST_CLIENT
      });

      console.log(prevData);

      if (prevData) {
        const filteredPosts = prevData.setPosts.filter(
          (post: any) => post.id !== props.postId
        );

        proxy.writeQuery({
          query: SET_POST_CLIENT,
          data: {
            setPosts: [...filteredPosts]
          }
        });
      }
    }
  });

  async function handleDeletePost() {
    try {
      await deletePost({ variables: { id: props.postId } });
      props.setAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MenuItem onClick={handleDeletePost}>
      <ListItemIcon className={classes.deleteButton}>
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Delete" />
    </MenuItem>
  );
}

const useStyles = makeStyles({
  deleteButton: {
    marginRight: 5,
    padding: 2,
    borderRadius: 5,
    backgroundColor: red[500],
    minWidth: 21,
    color: "white",
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  deleteIcon: {
    width: 20
  }
});

export default DeletePost;
