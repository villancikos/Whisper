function ui(state = {}, action) {
    switch (action.type){
        case 'SHOW_CONTACTS_SIDEBAR':
        case 'START_NEW_CONVERSATION':
            return {
                ...state,
                leftDrawer: !state.leftDrawer
            }
    }
    return state;
}

export default ui;