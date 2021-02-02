import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ isAuthed, path, children, ...props }) => {
  return (
    <Route path={path} {...props}>
      {!isAuthed ? <Redirect to="/waveform" /> : { ...children }}
    </Route>
  );
};

export default AuthRoute;
