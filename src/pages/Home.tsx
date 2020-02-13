import React, { useContext } from "react";

import NavigationBar from "../components/NavigationBar";

import { AuthContext } from "../context/Authcontext";

function Home(props: any): JSX.Element {
  const context = useContext(AuthContext);
  return (
    <div>
      <NavigationBar
        {...props}
        username={context.user.username}
        logout={context.logout}
      />
    </div>
  );
}

export default Home;
