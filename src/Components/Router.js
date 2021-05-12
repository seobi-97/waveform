import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthRoute from "../Routes/AuthRoute";
import DataContext from "../Contexts/DataContext";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import ProjectStart from "./Pages/ProjectStart";
import Header from "./Pages/Header";

const Router = ({ user }) => {
  const [projData, setProjData] = useState({});

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/waveform" exact>
          {!user.userToken ? (
            <Login updateUserToken={user.updateUserToken} />
          ) : (
            <Redirect to="/waveform/start/project" />
          )}
        </Route>
        <Route path="/waveform/signup" exact component={SignUp} />
        <DataContext.Provider
          value={{
            data: projData,
            update: (state) =>
              setProjData((prev) => {
                return { ...prev, ...state };
              }),
          }}
        >
          <AuthRoute
            path="/waveform/start/project"
            isAuthed={user.userToken ? true : false}
          >
            <ProjectStart user={user} />
          </AuthRoute>
          <AuthRoute
            path="/waveform/start/header"
            isAuthed={user.userToken ? true : false}
          >
            <Header user={user} />
          </AuthRoute>
          <AuthRoute
            path="/waveform/main"
            isAuthed={user.userToken ? true : false}
          >
            <Main user={user} />
          </AuthRoute>
        </DataContext.Provider>
        <Redirect from="*" to="/waveform" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
