import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import ToDoList from '../pages/ToDoList';
import ToDoCreate from '../pages/ToDoCreate';
import ToDoEdit from '../pages/ToDoEdit';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ToDoList}/>
      <Route path="/create" component={ToDoCreate}/>
      <Route path="/edit" component={ToDoEdit}/>
      <Redirect from="*" to="/404"/>
    </Switch>
  );
};

export default Routes;