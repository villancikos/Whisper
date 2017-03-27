import C from '../actions/actionConstants';
import { ref, fAuth } from '../components/helpers/firebase'

function auth(state = {}, action) {
    switch (action.type) {
        case C.LOGIN_USER:
            console.log("what?")
            return state;
    }
    return state;
}

export default auth;