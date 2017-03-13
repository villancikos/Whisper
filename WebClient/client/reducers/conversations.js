import h from '../components/helpers/h';

function conversations(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_CONVERSATION_HEADER':
            return {
                ...state,
                [action.conversationId]: {
                    last_message: action.lastMessage,
                    timestamp: action.timestamp
                }
            }
        case 'START_NEW_CONVERSATION':
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