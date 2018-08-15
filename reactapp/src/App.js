import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Formaction from './components/Formaction';
import draw from './components/drawview';

class App extends Component {
render() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Formaction}></Route>
        <Route path="/draw" component={draw}></Route>
    </Switch>
    </Router>
  );
}
}
export default App;