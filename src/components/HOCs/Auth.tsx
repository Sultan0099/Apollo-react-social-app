import React from "react";
import { Redirect } from "react-router-dom";

export const auth = (OriginalComponent: React.FC): any => {
  return function(props: any) {
    const token = localStorage.getItem("jwtToken");

    if (!token) return <Redirect to="/login" />;
    return <OriginalComponent />;
  };
};
