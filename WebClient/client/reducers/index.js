import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import conversations from './conversations';
import messages from './messages';
import users from './users';
import currentConversation from './currentConversation';
import leftDrawer from './leftDrawer';
import loggedUser from './loggedUser';


// Also need to pass the router.
const rootReducer = combineReducers({conversations, messages, users, currentConversation,leftDrawer,loggedUser, routing: routerReducer });

export default rootReducer;