// Importing Third Party Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Match, Miss } from 'react-router';

// Import Our Main Components
import Login from './components/login';
import AppWrapper from './components/AppWrapper';

/*
    App Login
*/
class AppLogin extends React.Component{
    render() {
        return (
            <div>
                <h2>Please login</h2>
            </div>
        );
    }
};

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
), document.getElementById('main'));