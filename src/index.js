import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddShop from './scenes/AddShop/AddShop';
import CardInfo from './scenes/CardInfo/CardInfo';
import Home from './scenes/Home/Home';
import NotFound from './scenes/NotFound/NotFound';
import Scanner from './scenes/Scanner/Scanner';
import * as serviceWorker from './serviceWorker';
import './styles/global.scss';

const routing = (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/scanner" exact strict component={Scanner} />
      <Route path="/shop" exact strict component={AddShop} />
      <Route path="/card/:id" component={CardInfo} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
