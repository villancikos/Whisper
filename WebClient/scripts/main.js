// Importing Third Party Libraries
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import { ref, firebaseAuth } from './config/firebaseapp';
import store, {history} from './store';

// Our helpers function to reduce code in main app
import h from './helpers/helpers';

// Import Our Components
// import Login from './components/login';
import App from './components/App';


// /*
//     App Login
// */
// class AppLogin extends React.Component{
//     render() {
//         return (
//             <div>
//                 <h2>Please login</h2>
//             </div>
//         );
//     }
// };


const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>
)
render(router, document.getElementById('main'));
