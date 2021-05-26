import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateUserForm from './components/Home/Form/CreateUserForm';
import TempForm from './components/Home/Form/TempForm';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/createuser">
          <CreateUserForm />
        </Route>
        <Route path="/temp-add">
          <TempForm />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
