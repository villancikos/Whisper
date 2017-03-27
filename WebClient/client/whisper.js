import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.styl';

// Import Components

import Main from './components/Main';
import App from './components/App';
import About from './components/About';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Auth from './components/Auth';

// import react router deps
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Auth}></IndexRoute>
        <Route path="/web" component={Main}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
