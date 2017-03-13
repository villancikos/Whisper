import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// Sample Data
import users from './sample-data/sample-users';
import conversations from './sample-data/sample-conversations';
import messages from './sample-data/sample-messages';
let defaultDrawerState = {visible: false};
// import the root reducer
import rootReducer from './reducers/index';

const defaultState = {
    users: users,
    conversations: conversations,
    messages: messages,
    currentConversation: '',
    leftDrawer: defaultDrawerState,
}


const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;