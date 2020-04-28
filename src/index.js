import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'
import * as serviceWorker from './serviceWorker';
import Scanner from "./components/Scanner";
import AddShop from "./components/AddShop";
import CardDetail from "./components/CardDetail";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/scanner/(edit)?/:name/:img?" component={Scanner} />
      <Route path="/shop" component={AddShop} />
      <Route path="/card/:id" component={CardDetail} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
