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
import { FETCH_PAGINATED_POST } from "../query";

function DeletePost(props: { postId: string; setAnchorEl: any }) {
  const classes = useStyles();

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy, data) {
      const prevData: any = proxy.readQuery({
        query: FETCH_PAGINATED_POST,
        variables: { page: 1, postLength: 10 }
      });

      console.log(prevData);

      if (prevData) {
        const filteredPosts = prevData.paginatedPost.posts.filter(
          (post: any) => post.id !== props.postId
        );

        proxy.writeQuery({
          query: FETCH_PAGINATED_POST,
          variables: { page: 1, postLength: 10 },
          data: {
            paginatedPost: {
              posts: [...filteredPosts],
              hasMore: prevData.hasMore,
              __typename: "paginatedPost"
            }
          }
        });
      }
    }
  });

  async function handleDeletePost() {
    console.log("postId", props.postId);
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
