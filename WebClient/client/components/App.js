import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actionCreator';
import AppWrapper from './AppWrapper';

function mapStateToProps(state) {
    return {
        conversations: state.conversations,
        users: state.users,
        messages: state.messages,
        currentConversation: state.currentConversation,
        leftDrawer: state.leftDrawer,
        loggedUser: '',
    }
}

function mapDispatchToProps(dispatch) {
     // pass actionCreators via props...
     return bindActionCreators(actionCreator, dispatch);
}

// Immediately call Main so we add all of the props from state to props.
// Add all our actionCreators to Props as well...
const App = connect(mapStateToProps, mapDispatchToProps)(AppWrapper);

export default App;
