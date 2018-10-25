import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import ToDo from '../pages/ToDo';
import NotFound from "../pages/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ToDo}/>
      <Route exact path="/404" component={NotFound}/>
      <Redirect from="*" to="/404"/>
    </Switch>
  );
};

export default Routes;