import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
import { fAuth, ref } from './components/helpers/firebase';

// Sample Data
// import users from './sample-data/sample-users';
// import conversations from './sample-data/sample-conversations';
// const loggedUser = '3phGyXkuBkgVTVH4Zzyk49kEj7y1';
// import the root reducer
import rootReducer from './reducers/index';

const defaultState = {
    users: {},
    participants: {},
    conversations: {},
    messages: {},
    currentConversation: {},
    ui: {
        leftDrawer: false,
        currentReceiver: '',
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