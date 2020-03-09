import React from "react";
import { Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";

import { auth } from "./components/HOCs/Auth";
import { AuthProvider } from "./context/Authcontext";

const TestComp = () => {
  return <h1> hello world</h1>;
};

const App = () => {
  return (
    <AuthProvider>
      <React.Fragment>
        <Switch>
          <Route exact={true} path="/" component={auth(Home)} />
          <Route
            exact={true}
            path="/Profile/:userId"
            component={auth(Profile)}
          />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route component={PageNotFound} />
        </Switch>
        {/* <Route exact={true} path="/" component={auth(Home)} /> */}
      </React.Fragment>
    </AuthProvider>
  );
};

export default App;
