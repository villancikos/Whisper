import h from '../components/helpers/h';
import C from '../actions/actionConstants';

function messages(state = {}, action) {
    switch (action.type) {
        case C.ADD_MESSAGE:
            // return the new state with the new comment
            return Object.assign({}, state, {
                [action.conversationId]: addMessage(state[action.conversationId], action)
            })
        case C.START_NEW_CONVERSATION:
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
        case C.ADD_MESSAGE:
        case C.START_NEW_CONVERSATION:
            // return the new state with the new comment
            return {
                ...state,
                [action.messageId]: {
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
