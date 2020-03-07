import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { useApolloClient } from "@apollo/react-hooks";

interface IUser {
  username?: string;
  token?: string;
  id?: string;
}

let initialState = {
  user: {}
};

const token = localStorage.getItem("jwtToken");

if (token) {
  const decodeToken: {
    username: string;
    id: string;
    iat: string;
    exp: number;
  } = jwtDecode(token);

  const checkExpiry = decodeToken.exp * 1000 <= Date.now();
  console.log(checkExpiry);
  if (!checkExpiry) {
    initialState.user = {
      username: decodeToken.username,
      id: decodeToken.id,
      token
    };
  } else {
    localStorage.removeItem("jwtToken");
  }
}

const AuthContext = createContext({
  user: { username: "", id: "", token: "" },
  login: (userData: any) => {},
  logout: () => {}
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };

    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { store } = useApolloClient();

  function login(userData: any) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData
    });
  }

  function logout() {
    store.reset();
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: { ...state.user }, login, logout }}
      {...props}
    />
  );
}

export { AuthProvider, AuthContext };
