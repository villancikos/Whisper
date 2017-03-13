function conversations(state = [], action) {
    switch (action.type) {
        case 'UPDATE_CONVERSATION_HEADER':
            return {
                ...state,
                [action.conversationId]: {
                    last_message: action.lastMessage,
                    timestamp: action.timestamp
                }
            }
        default:
            return state;

    }
    return state;
}

export default conversations;