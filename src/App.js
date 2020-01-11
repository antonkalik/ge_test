import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home, About, NotFound } from './views';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
