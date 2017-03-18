import C from '../actions/actionConstants';

function ui(state = {}, action) {
    switch (action.type){
        case C.SHOW_CONTACTS_SIDEBAR:
        case C.START_NEW_CONVERSATION:
            return {
                ...state,
                leftDrawer: !state.leftDrawer
            }
    }
    return state;
}

export default ui;