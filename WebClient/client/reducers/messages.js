function randomIdGenerator() {
    var messageId = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 22; i++){
        messageId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return messageId;
}
function messages(state = {}, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            // return the new state with the new comment
            return Object.assign({}, state, {
                [action.conversationId]: addMessage(state[action.conversationId], action)
            })
        case 'START_NEW_CONVERSATION':
            console.log('STARTING A NEW CONVERSATION ON MESSAGES REDUCER');
            return Object.assign({}, state, {
                [action.conversationId]: addMessage(state[action.conversationId], action)
            })
        default:
            return state;

    }
    return state;
}

function addMessage(state = {}, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
        case 'START_NEW_CONVERSATION':
            // return the new state with the new comment
            return {
                ...state,
                [action.messageId || randomIdGenerator()]: {
                    sender: action.sender,
                    content: action.content || action.lastMessage,
                    typeOfContent: action.typeOfContent,
                    timestamp: action.timestamp
                }

            }

        default:
            return state;
    }
}

export default messages;
