import React from 'react';
import autobind from 'autobind-decorator';
import { ref, firebaseAuth } from '../config/firebaseapp';

const users = ref.child('users');
/* 
  NewConversation Component
*/
@autobind
export default class ConversationsSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
        }
    }
    componentWillMount() {
        console.log("Se monto el new convo");
        users.once('value', usersSnapshot => {
            // usersSnapshot.child('jurdini01').forEach(userKey=>{
            //     console.log(userKey.val())
            // });
            usersSnapshot.forEach(user=>{
                console.log(user.key);
                this.state.users[user.key]=user.val().name
                this.setState({ users: this.state.users })
            })
            // this.setState({
            //     users: usersSnapshot.val()
            // });
        });
    }
    startConversation(key,evt){
        evt.preventDefault();
        console.log("We need to start a new conversation. ", key)
        // push a new key to this user conversations.

        // render the new conversation in sidebar.

        // only when the user send a new message append this
        // message to the conversation 
    }
    renderUsers(key) {
        return <li key={key}><a onClick={(evt)=>this.startConversation(key, evt)} href="">{this.state.users[key]}</a></li>
    }
    render() {
        return (
            <div className="" >
                {Object.keys(this.state.users).map(this.renderUsers)}
            </div >
        )
    }
}