import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import conversations from './conversations';
import messages from './messages';
import users from './users';


// Also need to pass the router.
const rootReducer = combineReducers({conversations, messages, users, routing: routerReducer });

export default rootReducer;