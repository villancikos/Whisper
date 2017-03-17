import h from '../components/helpers/h';
import C from '../actions/actionConstants';

function currentConversation(state = {}, action) {
    switch (action.type) {
        case C.TOGGLE_CONVERSATION:
            return Object.assign({}, state.currentConversation, {
                [action.index]: true
            })
        case C.START_NEW_CONVERSATION:
            return Object.assign({}, state.currentConversation, {
                [action.conversationId]: true
            })
        default:
            return state;

    }
    return state;
}

export default currentConversation;
