import C from '../actions/actionConstants';

function loggedUser(state = {}, action) {
    switch (action.type) {
        case C.LOGGED_IN:
        console.log("Logged_in dispatched")
            return state;
    }
}


export default loggedUser;
