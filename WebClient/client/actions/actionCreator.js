import h from '../components/helpers/h';
import C from './actionConstants';
// Runs whenever a new conversation is created in the 
// user database
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
