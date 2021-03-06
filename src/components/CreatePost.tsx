import React, { useState, useRef } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";

import { useMutation } from "@apollo/react-hooks";

import { CREATE_POST } from "../mutations";

import { FETCH_USER } from "../query";
import { SET_POST_CLIENT } from "../utils/typeDefsClient";

function CreatePost(props: any) {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  let textRef = useRef<HTMLInputElement>();

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, { data: { createPost } }) {
      console.log("createPost", createPost);
      const posts: any = proxy.readQuery({ query: SET_POST_CLIENT });

      proxy.writeQuery({
        query: SET_POST_CLIENT,
        data: { setPosts: [createPost, ...posts.setPosts] }
      });
    }
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  async function handleSubmit() {
    try {
      let postBody = textRef.current?.value;
      await createPost({ variables: { body: postBody } });
      setOpen(false);
    } catch (err) {
      setErr("Post body should be 4 to 500 character long");
    }
  }
  return (
    <div>
      <Button
        type="button"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        <BorderColorTwoToneIcon style={{ marginRight: 5, width: 15 }} />
        create Post
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Write post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Post body"
            error={err.length > 0 ? true : false}
            type="text"
            inputRef={textRef}
            multiline={true}
            fullWidth
          />
          {err.length > 0 ? (
            <li
              style={{
                color: "red"
              }}
            >
              {err}
            </li>
          ) : (
              ""
            )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles({
  button: {
    marginTop: 5
  },
  dialog: {
    minWidth: 500
  }
});

export default CreatePost;
