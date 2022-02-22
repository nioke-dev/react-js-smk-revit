import React from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import Content from "./Content";

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}/:isi`}>
          <Content />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
