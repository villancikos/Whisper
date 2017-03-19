import h from '../components/helpers/h';
import C from './actionConstants';
import { fAuth, ref } from '../components/helpers/firebase';
const loggedUser = 'aZs5rISKcqWbed5rEyagbsIx5Ij2';

export function watchFirebase(dispatch) {
  ref.on('value', (snap) => {
    dispatch(fetchConversationsFromFirebase());
    dispatch(fetchMessagesFromFirebase());
    dispatch(fetchParticipants());
  });
}

// FIREBASE conversations
function fetchConversationsFromFirebase() {
  return function (dispatch) {
    var conversations = {}
    if (loggedUser !== null) {
      var userConversations = ref.child("users/" + loggedUser);
      userConversations.on('value', (userSnapshot) => {
        userSnapshot.child('conversations').forEach((conversationKey) => {
          var conversationRef = ref.child('conversations').child(conversationKey.key);
          conversationRef.orderByChild('timestamp').on('value', (conversationsSnapshot) => {
            var conversation = conversationsSnapshot.val();
            conversations[conversationKey.key] = conversation;
          });
        });
      });
    }
    dispatch({
      type: C.FETCH_CONVERSATIONS,
      conversations
    })
  }
}

// FIREBASE Messages
function fetchMessagesFromFirebase() {
  return function (dispatch) {
    var messages = {}
    if (loggedUser !== null) {
      var userConversations = ref.child("users/" + loggedUser);
      userConversations.on('value', (userSnapshot) => {
        userSnapshot.child('conversations').forEach((conversationKey) => {
          var messageRef = ref.child('messages').child(conversationKey.key);
          messageRef.orderByChild("timestamp").on('value', (messagesSnapshot) => {
            var message = messagesSnapshot.val();
            messages[conversationKey.key] = message;
          });
        });
      });
    }
    dispatch({
      type: C.FETCH_MESSAGES,
      messages
    })
  }
}


function fetchParticipants() {
  return function (dispatch) {
    var participants = {}
    if (loggedUser !== null) {
      var userConversations = ref.child("users/" + loggedUser);
      userConversations.on('value', (userSnapshot) => {
        userSnapshot.child('conversations').forEach((conversationKey) => {
          var participantRef = ref.child('participants').child(conversationKey.key);
          participantRef.on('value', (participantsSnapshot) => {
            var participant = participantsSnapshot.val();
            participants[conversationKey.key] = participant;
          });
        });
      });
    }
    dispatch({
      type: C.FETCH_PARTICIPANTS,
      participants
    })
  }
}

// Runs whenever a new conversation 
// is created in the user database
export function addConversation(index) {
  return {
    type: C.ADD_CONVERSATION,
    index
  }
}
// runs when user clicks on a conversation and so it appears
// on the righ drawer.
export function toggleConversation(index) {
  return {
    type: C.TOGGLE_CONVERSATION,
    index
  }
}

// runs whenever user sends message inside chat
export function addMessage(conversationId, messageId, sender, receiver, content, typeOfContent, timestamp) {
  return {
    type: C.ADD_MESSAGE,
    conversationId,
    messageId,
    sender,
    receiver,
    content,
    typeOfContent,
    timestamp,
  }
}

// async action for sending to firebase messages
export function pushMessages(conversationId, sender, receiver, content, typeOfContent) {
  return function (dispatch) {
    var messageId = ref.push(); // we get an autogenerated id from firebase
    var updates = {}; // hold the updates 
    var timestamp = Date.now(); // now epoch time
    var message_data = {
      sender,
      receiver,
      content,
      typeOfContent,
      timestamp,
    }
    updates['/messages/' + conversationId + "/" + messageId.key] = message_data;
    ref.update(updates);
    // Now dispatching the pure function so we can modify render of components
    dispatch(addMessage(conversationId, messageId.key, sender, receiver, content, typeOfContent, timestamp));
  }
}

// Updates the conversation header of the sidebar.
export function updateConversationHeader(conversationId, lastMessage, timestamp, sender) {
  return {
    type: C.UPDATE_CONVERSATION_HEADER,
    conversationId,
    lastMessage,
    timestamp,
    sender
  }
}
// Async action 
export function pushConversation(conversationId, lastMessage, sender) {
  return function (dispatch) {
    var timestamp = Date.now(); // now epoch time
    // Sending Firebase Data.
    var update_conversation = {
      last_message: lastMessage,
      timestamp,
      sender,
    }
    var updates = {};
    updates['/conversations/' + conversationId] = update_conversation;
    ref.update(updates);
    // Dispatch new state to our React Components
    dispatch(updateConversationHeader(conversationId, lastMessage, timestamp, sender));
  }
}


export function showContactsSidebar() {
  return function (dispatch) {
    dispatch(fetchFirebaseUsers());
  }
}




export function startListeningToAuth() {
  return function (dispatch) {
    fAuth.auth().onAuthStateChanged((authData) => {
      if (authData) {
        dispatch({
          type: C.LOGIN_USER,
          uid: authData.uid
        });
      }
    });
  }
}

export function attemptLogin() {
  return function (dispatch) {
    dispatch({ type: C.ATTEMPTING_LOGIN });
    fAuth.signInWithCrdential((error, password) => {
      if (error) {
        dispatch({ type: C.LOGIN_ERROR, error: "Login failed! " + error });
      }
    })
  }
}

// because we are starting a new conversation first we need TODO: evaluate if there 
// is no current conversation between sender (loggedUser) and receiver. If not...
// then we can start a new one. Else, we need to fetch the conversation id.
export function startNewConversation(sender, receiver) {
  console.log("Sender");
  console.log(sender);
  console.log("Receiver");
  console.log(receiver);
  return {
    type: C.START_NEW_CONVERSATION,
    sender,
    receiver,
    conversationId: h.createRandomId(),
    messageId: h.createRandomId(),
    lastMessage: '',
    timestamp: '',
    typeOfContent: 'text',
  }
}

function fetchFirebaseUsers(sender, receiver) {
  return function (dispatch) {
    var users = {}
    ref.child("users").once('value', (userSnapshot) => {
      var userDetails = userSnapshot.val();
      for (var user in userDetails){
        if (user !== loggedUser){
          users[user] = userDetails[user]
        }
      }
    });
    dispatch({
      type: C.SHOW_CONTACTS_SIDEBAR,
      users
    })
  }
  
}