import C from '../actions/actionConstants';

function participants(state = {}, action) {
    switch (action.type){
        case C.READ_PARTICIPANT:
            return state;
    }
    return state;
}

export default participants;