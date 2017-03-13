// Runs whenever a new conversation is created in the 
// user database
export function addConversation(index) {
  return {
    type: 'ADD_CONVERSATION',
    index
  }
}
// runs when user clicks on a conversation and so it appears
// on the righ drawer.
export function toggleConversation(index) {
  return {
    type: 'TOGGLE_CONVERSATION',
    index: index
  }
}

// runs whenever user sends message inside chat
export function addMessage(conversationId, messageId, sender, content, typeOfContent, timestamp) {
  return {
    type: 'ADD_MESSAGE',
    conversationId,
    messageId,
    sender,
    content,
    typeOfContent,
    timestamp

  }
}


// Updates the conversation header of the sidebar.
export function updateConversationHeader(conversationId, lastMessage, timestamp) {
  return {
    type: 'UPDATE_CONVERSATION_HEADER',
    conversationId,
    lastMessage,
    timestamp

  }
}

export function showContactsSidebar() {
  return {
    type: 'SHOW_CONTACTS_SIDEBAR',
  }
}


export function startNewConversation(sender,conversationId,lastMessage,timestamp,typeOfContent) {
  return {
    type: 'START_NEW_CONVERSATION',
    sender,
    conversationId,
    lastMessage,
    timestamp,
    typeOfContent:'text',
  }
}
