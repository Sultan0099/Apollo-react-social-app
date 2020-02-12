import React, { useContext } from "react";

import { AuthContext } from "../context/Authcontext";

function Home(props: any) {
  const context = useContext(AuthContext);
  return (
    <div>
      <h1>user : {context.user.id} </h1>
      <h1>user : {context.user.username} </h1>
    </div>
  );
}

export default Home;
