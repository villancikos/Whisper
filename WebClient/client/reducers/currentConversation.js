function currentConversation(state = [], action) {
    switch (action.type) {
        case 'TOGGLE_CONVERSATION':
            return Object.assign({}, state.currentConversation, {
                [action.index]:true
            })
        default:
            return state;

    }
    return state;
}

export default currentConversation;
