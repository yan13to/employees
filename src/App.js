import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Counter from './pages/Counter'
import Employees from './pages/Employees'

function App() {
  return (
    <Router>
      <nav className="navbar navbar-light bg-light sticky-top">
        <div className="container">
          <Link to="/">Counter</Link>
          <Link to="/employees">Employees</Link>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Counter />
        </Route>
        <Route exact path="/employees">
          <Employees />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
