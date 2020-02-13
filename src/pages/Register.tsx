import React, { useState, useContext } from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { USER_REGISTER } from "../mutations";
import { AuthContext } from "../context/Authcontext";

interface IUser {
  email?: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
  name?: string;
}

function Register(props: any): JSX.Element {
  if (localStorage.getItem("jwtToken")) {
    props.history.push("/");
  }
  const classes = useStyles(props);

  const context = useContext(AuthContext);

  const [user, setUser] = useState<IUser>({
    email: "",
    username: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<IUser>({});

  const [register, { loading: mutationLoading }] = useMutation(USER_REGISTER, {
    update(_: any, { data: { register } }) {
      delete register.__typename;
      context.login(register);
      props.history.push("/");
    },
    onError(...err) {
      let gqlErrors: any = {};

      // handling Errors

      if (err[0]?.graphQLErrors[0]?.message === "Signup validation Error") {
        gqlErrors = err[0]?.graphQLErrors[0]?.extensions?.errors;
        setErrors({ ...errors, ...gqlErrors });
      } else {
        gqlErrors = err[0]?.graphQLErrors[0]?.extensions?.exception.errors;

        let emailError = gqlErrors.hasOwnProperty("email");
        let userNameError = gqlErrors.hasOwnProperty("username");

        setErrors({
          ...errors,
          username: userNameError && gqlErrors?.username.message,
          email: emailError && gqlErrors?.email.message
        });
      }
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function onSubmit() {
    try {
      setErrors({});
      if (user.password !== user.confirmPassword) {
        setErrors({ ...errors, confirmPassword: "Password not matched" });
        return;
      }

      await register({
        variables: {
          email: user.email,
          password: user.password,
          name: user.name,
          username: user.username
        }
      });
      // setErrors({});
    } catch (err) {}
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h1" style={{ textAlign: "center", color: "blue" }}>
        Hy User!
      </Typography>
      <TextField
        variant="filled"
        error={errors.email ? true : false}
        label="Email"
        fullWidth
        type="text"
        value={user.email}
        name="email"
        onChange={handleChange}
        style={{ marginTop: 10 }}
      />
      <TextField
        variant="filled"
        error={errors.username ? true : false}
        label="Username"
        fullWidth
        type="text"
        value={user.username}
        name="username"
        onChange={handleChange}
        style={{ marginTop: 10 }}
      />
      <TextField
        variant="filled"
        error={errors.name ? true : false}
        label="Full Name"
        fullWidth
        type="text"
        value={user.name}
        name="name"
        onChange={handleChange}
        style={{ marginTop: 10 }}
      />
      <TextField
        variant="filled"
        error={errors.password ? true : false}
        label="Password"
        fullWidth
        value={user.password}
        type="password"
        name="password"
        onChange={handleChange}
        style={{ marginTop: 10 }}
      />
      <TextField
        variant="filled"
        error={errors.confirmPassword ? true : false}
        label="Confirm Password"
        fullWidth
        value={user.confirmPassword}
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        style={{ marginTop: 10 }}
      />
      {/* SHOWING ERRORS */}
      <ul>
        {Object.keys(errors).length > 0 &&
          Object.values(errors).map((err: any, index: number) => {
            if (err != "") {
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
            }
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
        to="/login"
        style={{
          color: "blue",
          // textDecoration: "none",
          fontSize: "13px",
          float: "right",
          marginTop: "25px"
        }}
      >
        {" "}
        Already Have Account{" "}
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

export default Register;
