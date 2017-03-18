import h from '../components/helpers/h';
import C from './actionConstants';
import { fAuth, ref } from '../components/helpers/firebase';

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
export function addMessage(conversationId, sender, content, typeOfContent) {
  return {
    type: C.ADD_MESSAGE,
    conversationId,
    messageId: h.createRandomId(),
    sender,
    content,
    typeOfContent,
    timestamp: Date.now(),
  }
}


// Updates the conversation header of the sidebar.
export function updateConversationHeader(conversationId, lastMessage, timestamp) {
  return {
    type: C.UPDATE_CONVERSATION_HEADER,
    conversationId,
    lastMessage,
    timestamp

  }
}

export function showContactsSidebar() {
  return {
    type: C.SHOW_CONTACTS_SIDEBAR,
  }
}

export function readParticipant() {
  return {
    type: C.READ_PARTICIPANT,
  }
}

export function startListeningToAuth(){
  return function (dispatch) {
    fAuth.auth().onAuthStateChanged((authData)=>{
      if (authData){
        dispatch({
          type: C.LOGIN_USER,
          uid: authData.uid
        });
      }
    });
  }
}

export function attemptLogin(){
  return function (dispatch) {
    dispatch({type:C.ATTEMPTING_LOGIN});
    fAuth.signInWithCrdential((error, password)=>{
      if (error){
        dispatch({type:C.LOGIN_ERROR,error:"Login failed! "+error});
      }
    })
    }
}

// because we are starting a new conversation first we need TODO: evaluate if there 
// is no current conversation between sender (loggedUser) and receiver. If not...
// then we can start a new one. Else, we need to fetch the conversation id.
export function startNewConversation(receiver) {
  return {
    type: C.START_NEW_CONVERSATION,
    sender:'currentLoggedUser',
    receiver,
    conversationId: h.createRandomId(),
    messageId: h.createRandomId(),
    lastMessage: '',
    timestamp: '',
    typeOfContent: 'text',
  }
}

