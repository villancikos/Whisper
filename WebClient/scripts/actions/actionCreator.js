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
    index
  }
}

// runs whenever user sends message inside chat
export function addMessage(index) {
  return {
    type: 'ADD_MESSAGE',
    index
  }
}

