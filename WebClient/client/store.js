import { createStore,applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
// Sample Data
import users from './sample-data/sample-users';
import conversations from './sample-data/sample-conversations';
import messages from './sample-data/sample-messages';
let defaultDrawerState = { leftDrawer: false };
// import the root reducer
import rootReducer from './reducers/index';

const defaultState = {
    users,
    conversations,
    messages,
    currentConversation: '',
    ui: {
        leftDrawer: false,
    },
    auth: {
        currently: null,
        uid: null,
    },
    
}


const store = createStore(
    rootReducer, 
    defaultState,
    applyMiddleware(
        thunkMiddleware // let us use "not pure" funtions on dispatch
    ));

export const history = syncHistoryWithStore(browserHistory, store);
export default store;