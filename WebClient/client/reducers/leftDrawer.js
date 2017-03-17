import C from '../actions/actionConstants';

// TODO: Fix this to reflect only one level toggle 
function leftDrawer(state = {}, action) {
    switch (action.type) {
        case C.SHOW_CONTACTS_SIDEBAR:
        case C.START_NEW_CONVERSATION:
            return {
                ...state,
                leftDrawer: !state.leftDrawer
            }

        default:
            return state;

    }
    return state;
}