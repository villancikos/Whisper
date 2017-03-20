import C from '../actions/actionConstants';

function participants(state = {}, action) {
    switch (action.type){
        case C.FETCH_PARTICIPANTS:
            return action.participants;
        case C.START_NEW_CONVERSATION:
            return state;
    }
    return state;
}

export default participants;