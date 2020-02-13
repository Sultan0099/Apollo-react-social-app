import React, { useState, useContext } from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { USER_LOGIN } from "../mutations";
import { AuthContext } from "../context/Authcontext";

interface IErrors {
  email?: string;
  password?: string;
  err?: string;
}

function Login(props: any): JSX.Element {
  if (localStorage.getItem("jwtToken")) {
    props.history.push("/");
  }
  const classes = useStyles(props);

  const context = useContext(AuthContext);

  const [email, setEmail] = useState<string>("user@example.com");
  const [password, setPassword] = useState<string>("123456");
  const [errors, setErrors] = useState<IErrors>({});

  const [signIn, { loading: mutationLoading }] = useMutation(USER_LOGIN, {
    update(_: any, { data: { signIn } }) {
      delete signIn.__typename;
      context.login(signIn);
      props.history.push("/");
    },
    onError(...err) {
      console.log(err);

      const gqlErrors = err[0]?.graphQLErrors[0]?.extensions?.errors;
      console.log(gqlErrors);

      setErrors({ ...gqlErrors });
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.name === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  }

  async function onSubmit() {
    try {
      setErrors({});
      await signIn({ variables: { email, password } });
    } catch (err) {}
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h1" style={{ textAlign: "center", color: "blue" }}>
        Hy User!
      </Typography>
      <TextField
        variant="filled"
        error={errors.email || errors.err ? true : false}
        label="Email"
        fullWidth
        value={email}
        name="email"
        onChange={handleChange}
        style={{ marginTop: 10 }}
      />
      <TextField
        variant="filled"
        error={errors.password || errors.err ? true : false}
        label="Password"
        fullWidth
        value={password}
        type="password"
        name="password"
        onChange={handleChange}
        style={{ marginTop: 10 }}
      />
      <ul>
        {Object.keys(errors).length > 0 &&
          Object.values(errors).map((err: any, index: number) => {
            return (
              <li
                key={index}
                style={{
                  color: "red"
                }}
              >
                {err}
              </li>
            );
          })}
      </ul>

      {mutationLoading ? (
        <CircularProgress size={25} />
      ) : (
        <Button
          type="button"
          color="primary"
          variant="outlined"
          onClick={onSubmit}
          style={{ marginTop: 10 }}
        >
          submit
        </Button>
      )}
      <Link
        to="/register"
        style={{
          color: "blue",
          // textDecoration: "none",
          fontSize: "13px",
          float: "right",
          marginTop: "25px"
        }}
      >
        {" "}
        Create New Account{" "}
      </Link>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    },
    margin: "0px auto",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate( -50% , -50%)"
  }
}));

export default Login;
