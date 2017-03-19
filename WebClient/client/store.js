import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
import { fAuth, ref } from './components/helpers/firebase';

// Sample Data
import users from './sample-data/sample-users';
// import conversations from './sample-data/sample-conversations';
let defaultDrawerState = { leftDrawer: false };
// import the root reducer
import rootReducer from './reducers/index';

// var loggedUser = 'aZs5rISKcqWbed5rEyagbsIx5Ij2';
// var conversations = {}
// if (loggedUser !== null) {
//     var userConversations = ref.child("users/" + loggedUser);
//     userConversations.on('value', (userSnapshot) => {
//         userSnapshot.child('conversations').forEach((conversationKey) => {
//             var conversationRef = ref.child('conversations').child(conversationKey.key);
//             conversationRef.on('value', (conversationsSnapshot) => {
//                 var conversation = conversationsSnapshot.val();
//                 conversations[conversationKey.key] = conversation;
//                 console.log(conversation);
//                 // this.state.conversations[conversationKey.key] = conversation;
//                 // this.setState({ conversations: this.state.conversations });
//             });
//         });
//     });
// }
// console.log(conversations);


const defaultState = {
    users,
    participants: '',
    conversations: '',
    messages: '',
    currentConversation: '',
    ui: {
        leftDrawer: false,
        currentReceiver: '',
    },
    auth: {
        currently: null,
        uid: 'aZs5rISKcqWbed5rEyagbsIx5Ij2',
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