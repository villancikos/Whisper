// a reducer takes in two things:

// 1. The action (info about what happened)

// 2. a COPY of the current state

//  action, store (or state)...
//  ok... let me see... 
//  return a new copy or updated copy of the store...
function conversations(state = [], action) {
    console.log("Inside conversations reducer");
    console.log(state,action);
    return state;
}


export default conversations;
