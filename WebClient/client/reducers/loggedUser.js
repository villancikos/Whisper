import C from '../actions/actionConstants';

function loggedUser(state = {}, action) {
    switch (action.type) {
        case C.LOGGED_IN:
            return state;
    }
}


export default loggedUser;
