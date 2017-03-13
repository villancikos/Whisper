// TODO: Fix this to reflect only one level toggle 
function leftDrawer(state = {}, action) {
    switch (action.type) {
        case 'SHOW_CONTACTS_SIDEBAR':
        case 'START_NEW_CONVERSATION':
            return {
                ...state,
                leftDrawer: !state.leftDrawer
            }

        default:
            return state;

    }
    return state;
}

function toggle(state) {
    state.leftDrawer = !state.leftDrawer
    return state;
}
export default leftDrawer;

// almost works.. it returns double propery
// function leftDrawer(state = {}, action) {
//     switch (action.type) {
//         case 'SHOW_CONTACTS_SIDEBAR':
//             return {
//                 ...state,
//                 leftDrawer: !state.leftDrawer
//             }

//         default:
//             return state;

//     }
//     return state;
// }

// function toggle(state) {
//     state.leftDrawer = !state.leftDrawer
//     return state;
// }
// export default leftDrawer;

//******** This:
// return Object.assign({}, state, {
//   [action.subreddit]: posts(state[action.subreddit], action)
// })
//******** is equivalent:
// let nextState = {}
// nextState[action.subreddit] = posts(state[action.subreddit], action)
// return Object.assign({}, state, nextState)