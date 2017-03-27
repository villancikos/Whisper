import C from '../actions/actionConstants';

function users(state = {}, action) {
    console.log("HOLA!")
    switch (action.type) {
        case C.SHOW_CONTACTS_SIDEBAR:
            return action.users;
    }
    return state;
}
export default users;

