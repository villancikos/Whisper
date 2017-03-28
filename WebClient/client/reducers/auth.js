import C from '../actions/actionConstants';
import { ref, fAuth } from '../components/helpers/firebase'

function auth(state = {}, action) {
    switch (action.type) {
        case C.LOGIN_USER:
            return {
                ...state,
                uid: action.uid
            }
        case C.LOGGED_OUT:
            return {
                ...state,
                uid: null
            }
    }
    return state;
}

export default auth;
