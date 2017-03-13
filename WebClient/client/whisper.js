import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.styl';

// Import Components

import Main from './components/Main';
import App from './components/App';
import About from './components/About';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main}></IndexRoute>
        <Route path="/about" component={About}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
