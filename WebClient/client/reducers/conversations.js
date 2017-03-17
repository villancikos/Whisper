import h from '../components/helpers/h';
import C from '../actions/actionConstants';

function conversations(state = {}, action) {
    switch (action.type) {
        case C.UPDATE_CONVERSATION_HEADER:
            return {
                ...state,
                [action.conversationId]: {
                    last_message: action.lastMessage,
                    timestamp: action.timestamp
                }
            }
        case C.START_NEW_CONVERSATION:
            console.log('STARTING A NEW CONVERSATION ON Conversations REDUCER');
            return {
                ...state,
                [action.conversationId]:{
                    last_message: action.lastMessage,
                    timestamp: action.timestamp,
                }
            }
        default:
            return state;

    }
    return state;
}

export default conversations;