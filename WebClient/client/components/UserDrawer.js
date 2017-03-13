import React from 'react';
import autobind from 'autobind-decorator';
import { ref, firebaseAuth } from '../config/firebaseapp';

const users = ref.child('users');
/* 
  UserDrawer Component
  This renders the sidebar with all the users available in Whisper
*/
@autobind
export default class UserDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
        }
    }
    componentWillMount() {
        // Find all the users in Firebase and render them
        users.once('value', usersSnapshot => {
            usersSnapshot.forEach(user => {
                this.state.users[user.key] = user.val().name
                this.setState({ users: this.state.users })
            })
        });
    }
    startConversation(userKey, evt) {
        evt.preventDefault();
        console.log("Dando click a un usuario");
        // Hide the user panel
        this.props.hideUserDrawer();
        // Render the AddMessageForm
        this.props.showActiveConversation();
        var loggedUser = this.props.loggedUser;
        // push a new key to this user conversations.
        var userPath = ref.child("/users/" + loggedUser + "/conversations/");
        var conversationPath = userPath.push();
        var conversationKey = conversationPath.key;
        // Show on the conversation Panel new conversation
        // this.props.promptConversationStarter(conversationKey, userKey);
        // var updates = {};
        // updates[conversationKey] = true;
        // userPath.update(updates);




        // var userConverastionData = {
        // last_message: "", 
        // timestamp: "", 
        // sender: loggedUser
        // }
        // console.log(userConversatonsPath);
        // updates[userConversation] = userConverastionData;
        // console.log(updates);
        // conversationPath.update(updates);

        // render the new conversation in sidebar.

        // only when the user send a new message append this
        // message to the conversation 
    }
    renderUsers(userKey) {
        return <li key={userKey}><a onClick={(evt) => this.startConversation(userKey, evt)} href="#">{this.state.users[userKey]}</a></li>
    }
    render() {
        return (
            <div>
                <h3>Select From The List</h3>
                <ul>
                    {Object.keys(this.state.users).map(this.renderUsers)}
                </ul>
            </div>
        )
    }
}