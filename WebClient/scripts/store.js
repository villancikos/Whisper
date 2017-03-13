import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// Sample Data
import users from '../samples/sample-users';
import conversations from '../samples/sample-conversations';
import messages from '../samples/sample-messages';

// import the root reducer
import rootReducer from './reducers/index';

const defaultState = {  
    users,
    conversations,
    messages
}

const store = createStore(rootReducer, defaultState);

// Keeping track of where I've been
//  because we need it accessible in other files we also export it...
export const history = syncHistoryWithStore(browserHistory, store);
// We export store as default, but remember that history is not exported as default
// that's why we need to do import {history} from ...
export default store;