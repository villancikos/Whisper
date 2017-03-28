import h from '../components/helpers/h';
import C from './actionConstants';
import { fAuth, ref } from '../components/helpers/firebase';
import store from '../store'

let loggedUser = "";

const logState = () => (dispatch, getState) => {
  console.log(getState());
};

export function fillLoggedUser() {
  return (dispatch, getState) => {
    dispatch({
      type: C.LOGGED_IN,
    });
  }
}


export function watchFirebase(dispatch) {
  console.log("Is this working outside?");
  ref.on('value', (snap) => {
    dispatch(fetchConversationsFromFirebase());
    dispatch(fetchMessagesFromFirebase());
    dispatch(fetchParticipants());
  });
  dispatch(startListeningToAuth());
  dispatch(initialFetch());
}


export function registerUser(email, uid, profile_pic, name) {
  return (dispatch) => {
    let pp = profile_pic;
    if (pp === null){
      pp = h.getRandomProfilePic();
    }
    let updates = {}
    updates['/users/' + uid] = {
      email,
      lastSeen: Date.now(),
      name,
      profile_pic: pp,
    }
    ref.update(updates);
  }
}
// FIREBASE conversations
function fetchConversationsFromFirebase() {
  return (dispatch) => {
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
  return (dispatch) => {
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


export function fetchParticipants() {
  return (dispatch) => {
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
  return (dispatch) => {
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
  return (dispatch) => {
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
  return (dispatch) => {
    dispatch(fetchFirebaseUsers());
  }
}




export function startListeningToAuth() {
  return (dispatch) => {
    fAuth.onAuthStateChanged((authData) => {
      if (authData) {
        dispatch({
          type: C.LOGIN_USER,
          uid: authData.uid
        });
        loggedUser = authData.uid;
      }
      else {
        dispatch({
          type: C.LOGGED_OUT,
        })
      }
    });
  }
}


function updateNewConversationState(sender, receiver, conversationId, messageId) {
  return {
    type: C.START_NEW_CONVERSATION,
    sender,
    receiver,
    conversationId,
    messageId,
    lastMessage: '',
    timestamp: '',
    typeOfContent: 'text',
  }
}

export function startNewConversation(sender, receiver, participants) {
  return (dispatch) => {
    // check out if already conv. exists between users
    let conversationId = participantsChecker(sender, receiver, participants);
    if (conversationId === undefined) {
      conversationId = ref.child('conversations').push().key;
    }
    let messageId = ref.child('messages').push().key;
    dispatch(updateNewConversationState(sender, receiver, conversationId, messageId));

  }
}

export function pushParticipants(conversationId, sender, receiver) {
  return (dispatch) => {
    let participants = {
      [conversationId]: {
        [sender]: true,
        [receiver]: true
      }
    }
    var updates = {}; // hold the updates 
    updates['/participants/' + conversationId] = participants[conversationId];
    updates['/users/' + sender + '/conversations/' + conversationId] = true;
    updates['/users/' + receiver + '/conversations/' + conversationId] = true;
    ref.update(updates);
  }
}

function participantsChecker(sender, receiver, participants) {
  for (var convo in participants) {
    let involved = Object.keys(participants[convo]);
    if (involved.includes(sender) && involved.includes(receiver)) {
      return convo;
    }
  }
}

export function fetchFirebaseUsers(sender, receiver) {
  return (dispatch) => {
    if (loggedUser !== null) {
      var users = {}
      ref.child("users").once('value', (userSnapshot) => {
        var userDetails = userSnapshot.val();
        for (var user in userDetails) {
          users[user] = userDetails[user]
        }
      });
      dispatch({
        type: C.SHOW_CONTACTS_SIDEBAR,
        users
      })
    }
  }
}

export function initialFetch(dispatch) {
  return (dispatch) => {
    if (loggedUser !== null) {
      console.log("ENTRO")
      var users = {}
      ref.child("users").once('value', (userSnapshot) => {
        var userDetails = userSnapshot.val();
        for (var user in userDetails) {
          users[user] = userDetails[user]
        }
      });
      dispatch({
        type: C.FILL_USERS,
        users
      })
    }
  }
}