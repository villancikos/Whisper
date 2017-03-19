import C from '../actions/actionConstants';

function participants(state = {}, action) {
    switch (action.type){
        case C.FETCH_PARTICIPANTS:
            return action.participants;
    }
    return state;
}

export default participants;