function messages(state = [], action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            // return the new state with the new comment
            return Object.assign({}, state, {
                [action.conversationId]: addMessage(state[action.conversationId], action)
            })
        default:
            return state;

    }
    return state;
}

function addMessage(state = [], action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            // return the new state with the new comment
            return {
                ...state,
                [action.messageId]: {
                    sender: action.sender,
                    content: action.content,
                    typeOfContent: action.typeOfContent,
                    timestamp: action.timestamp
                }


            };
    }
}

export default messages;
