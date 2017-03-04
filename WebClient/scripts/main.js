// Importing Third Party Libraries
import { browserHistory, Router, Route, Match, Miss } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { ref, firebaseAuth } from './config/firebaseapp';

// Our helpers function to reduce code in main app
import h from './helpers/helpers';

// Import Our Components
import Login from './components/login';
import AppWrapper from './components/AppWrapper';




/*
    App Login
*/
var AppLogin = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Please login</h2>
            </div>
        );
    }
});

/*
    Routes
*/
// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
// Add <Route path="*" component={NoMatch}/> for 404s
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/app" component={AppWrapper} />
    </Router>
), document.getElementById('main'))