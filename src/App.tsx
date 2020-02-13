import React from "react";
import { Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { auth } from "./components/HOCs/Auth";
import { AuthProvider } from "./context/Authcontext";

const App = () => {
  return (
    <AuthProvider>
      <React.Fragment>
        {/* <Route exact={true} path="/" component={auth(Home)} /> */}
        <Route exact={true} path="/" component={auth(Home)} />
        <Route exact={true} path="/Profile" component={Profile} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Register} />
      </React.Fragment>
    </AuthProvider>
  );
};

export default App;
