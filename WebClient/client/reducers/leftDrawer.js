function leftDrawer(state = [], action) {
    console.log("show contacts sidebar");
    switch (action.type) {
        case 'SHOW_CONTACTS_SIDEBAR':
            return Object.assign({}, state, {
                visible: !state.leftDrawer
        })

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