import { browserHistory, Router, Route, Match, Miss } from 'react-router';

var React = require('react');
var ReactDOM = require('react-dom');

// Our helpers function to reduce code in main app
import h from './helpers/helpers';

import Login from './components/login';
import { ref, firebaseAuth } from './config/firebaseapp'
const convosRef = ref.child("conversations");
const messageRef = ref.child("messages");
const user_id = 'jurdini01';
const usersRef = ref.child("users/" + user_id);
const participantsRef = ref.child("participants/");

/*
    Main Wrapper for our Whisper Web App
*/
var AppWrapper = React.createClass({
    getInitialState: function () {
        console.log("AppWrapper Initial State.");
        return {
            conversations: {},
            messages: {},
            availableConversations: {},
            loggedUser: '',
        }
    },
    componentWillMount: function () {
        console.log("AppWrapper component will mount.");
    },
    componentDidMount: function () {
        console.log("AppWrapper component is now mounted.");
        firebaseAuth.onAuthStateChanged(user => {
            var loggedUser = null;
            if (user) {
                loggedUser = user.uid;
            }
            this.state.loggedUser = loggedUser||null;
            this.setState({
                loggedUser: this.state.loggedUser
            }); 
            var userConversations = ref.child("users/" + this.state.loggedUser);
            userConversations.on('value', userSnapshot => {
                userSnapshot.child('conversations').forEach(conversationKey => {
                    var conversationRef = convosRef.child(conversationKey.key);
                    conversationRef.on('value', conversationsSnapshot => {
                        var conversation = conversationsSnapshot.val();
                        this.state.conversations[conversationKey.key] = conversation;
                        this.setState({ conversations: this.state.conversations });
                    });
                });
            });
        });
        this.setState({
            participants: {
                conversation0001: {
                    ramiri01: true,
                    jurdin01: true
                },
                conversation0002: {
                    lucas02: true,
                    jurdini01: true
                },
            },
            availableConversations: {

            },
        });

    },
    refreshConversationPanel: function (new_conversation) {
        delete this.state.availableConversations;

        ref.child("messages/" + new_conversation).on("value", snapshot => {
            var obj = {}
            obj[new_conversation] = snapshot.val()
            this.setState({ availableConversations: obj })
        });


    },
    getDefaultProps: function () {
        var thisconvo = this.loadSampleConversations
        return {
        }
    },
    addNewMessage: function (conversation_id, message_id, message_data) {
        // update the state object
        this.state.availableConversations[conversation_id][message_id] = message_data;
        // now set the state.
        this.setState({ availableConversations: this.state.availableConversations });

        // Update Conversation on Firebase.
        // Write the new post's data simultaneously in the posts list and the user's post list.
        // debugger;
        var update_conversation = {
            last_message: message_data.content,
            timestamp: message_data.timestamp,
            sender: message_data.sender
        }
        var updates = {};
        updates['/messages/' + conversation_id + "/" + message_id] = message_data;
        updates['/conversations/' + conversation_id] = update_conversation;
        ref.update(updates);

    },
    render: function () {
        return (
            <div className="row">
                <ConversationsSideBar conversations={this.state.conversations} refreshConversationPanel={this.refreshConversationPanel} />
                <ConversationPanel availableConversations={this.state.availableConversations} addNewMessage={this.addNewMessage} loggedUser={this.state.loggedUser}/>
            </div>

        )
    }
});

/* 
  ConversationsSideBar
  This will let us make <StorePicker/>
*/

var ConversationsSideBar = React.createClass({
    renderConversation: function (key) {
        return <Conversation key={key} index={key} details={this.props.conversations[key]} refreshConversationPanel={this.props.refreshConversationPanel} />
    },
    render: function () {
        return (
            <div className="col-md-4">
                <ul>
                    {Object.keys(this.props.conversations).map(this.renderConversation)}
                </ul>
            </div>
        )
    }
});


/*
    Conversation 
    In charge of rendering each conversation available on the sidebar
 */
var Conversation = React.createClass({
    retrieveConversation: function (index) {
        // In this section we add the state to the message.
        // So this is the best place to call the conversation from firebase.
        this.props.refreshConversationPanel(index);
    },
    render: function () {
        var last_message = this.props.details.last_message;
        var time = h.formatTime(this.props.details.timestamp);
        var index = this.props.index;
        return (
            <li>
                <button href={this.props.index} onClick={this.retrieveConversation.bind(this, index)}>{this.props.index}</button>
                <p>{last_message}</p>
                <pre>{time}</pre>
            </li>
        )
    }
});



/* 
    Conversation Panel
    Used to render the conversation that the user clicked and is 
    currently interacting on.
*/

var ConversationPanel = React.createClass({
    getMessageList: function (conversationId) {
        return <MessageList key={conversationId} index={conversationId} messages={this.props.availableConversations[conversationId]} addNewMessage={this.props.addNewMessage} loggedUser={this.props.loggedUser}/>
    },
    render: function () {
        return (
            <div className="conversation-panel">
                <div className="">
                    {Object.keys(this.props.availableConversations).map(this.getMessageList)}
                </div>

            </div>
        )
    }
});

/*
    Add Message Component
    Will take care of adding new messages to a conversation.
 */
var AddMessage = React.createClass({
    addNewMessage: function (event) {
        // Must add logic for firebase
        // 1. Stop form submitting defauly behavior.
        event.preventDefault();
        // 2. Take data from the form and create a new message
        // create custom message_id and form message_data
        var conversation_id = this.refs.conversation_id.value;
        var message_id = h.generateMessageId();
        var message_data = {
            sender: this.refs.user.value,
            content: this.refs.content.value,
            typeOfContent: "text",
            timestamp: Date.now()
        }
        // 3. Pass message data to parent and clean form
        this.props.addNewMessage(conversation_id, message_id, message_data);
        this.refs.messageForm.reset();


    },
    render: function () {
        var uid = 'pancrasio';
        return (
            <form ref="messageForm" onSubmit={this.addNewMessage} >
                <input type="text" ref="content" />
                <input type="hidden" ref="user" value={this.props.loggedUser} />
                <input type="hidden" ref="conversation_id" value={this.props.conversation_id} />
                <button type="submit">Send Message</button>
            </form>
        )
    }

});

/*
    MessageList
    Will add to state all the messages inside a conversation.
*/
var MessageList = React.createClass({
    renderMessage: function (message_id) {
        return <Message index={message_id} key={message_id} message_data={this.props.messages[message_id]} />
    },
    render: function () {
        //  TODO: Add try catch if conversation is empty.
        return (
            <div><ul>
                {Object.keys(this.props.messages).map(this.renderMessage)}</ul>
                <AddMessage addNewMessage={this.props.addNewMessage} conversation_id={this.props.index} loggedUser={this.props.loggedUser} />
            </div>
        )
    }
});


/*
    Message Component
    Renders all the messages from a conversation into the DOM
*/
var Message = React.createClass({
    render: function () {
        var message_data = this.props.message_data;
        return (
            <li>
                <h4>{message_data.sender}</h4>
                <p>{message_data.content}</p>
                <p>{message_data.typeOfContent}</p>
                <p>{h.formatTime(message_data.timestamp)}</p>

            </li>
        )
    }
});

/*
    App Login
*/
var AppLogin = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Please login</h2>
            </div>
        );
    }
});

/*
    Routes
*/
// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
// Add <Route path="*" component={NoMatch}/> for 404s
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/app" component={AppWrapper} />
    </Router>
), document.getElementById('main'))