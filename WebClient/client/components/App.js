import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actionCreator';
import AppWrapper from './AppWrapper';
import { watchFirebase } from '../actions/actionCreator';

function mapStateToProps(state) {
    return {
        participants: state.participants,
        conversations: state.conversations,
        users: state.users,
        messages: state.messages,
        currentConversation: state.currentConversation,
        ui: {
            ...state.ui
        },
        auth: {
            ...state.auth
        }
    }
}

function mapDispatchToProps(dispatch) {
    // Global Dispatcher for Firebase async actions
    watchFirebase(dispatch);
    // main binder
    return bindActionCreators(actionCreator, dispatch);
}

// Immediately call AppWrapper so we add all of the props from state to props.
// Add all our actionCreators to Props as well...
const App = connect(mapStateToProps, mapDispatchToProps)(AppWrapper);

export default App;
