var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var createBrowserHistory = require('history/lib/createBrowserHistory');

// Our helpers function to reduce code in main app
var h = require('./helpers');
import * as firebase from 'firebase';
var app = firebase.initializeApp({

    apiKey: "AIzaSyBghW4rGKXMhzjJXPBZIhWmHaYRqpz7AZo",
    authDomain: "pythonwithfirebase-6b00a.firebaseapp.com",
    databaseURL: "https://pythonwithfirebase-6b00a.firebaseio.com",
    storageBucket: "pythonwithfirebase-6b00a.appspot.com",
    messagingSenderId: "740790435984"

});
const database = firebase.database();
const convosRef = database.ref("conversations");
const messageRef = database.ref("messages");
// const participantsRef = database.ref("participants");
// const participantsRef = require('../samples/sample-participants');
const user_id = 'jurdini01';
const usersRef = database.ref("users/" + user_id);
const participantsRef = database.ref("participants/");





// console.log(usersRef.users.ramiri01.conversations);
// Get all the conversations to which user has access
Object.keys(usersRef).map(function (key) {
    // console.log(usersRef[key]);
    // console.log(usersRef[key]);
});

usersRef.once('value', snapshot => {
    // Obtain the conversations of this user
    var conversations = Object.keys(snapshot.child("/conversations/").val());
    for (var i = 0; i < conversations.length; i++) {
        database.ref('/conversations/' + conversations[i]).once('value', childSnapshot => {
            // console.log(childSnapshot.val());

        });
    }
});

// console.log(conversationList);

usersRef.once('value', snapshot => {
    var data = snapshot.val()
    var keys = Object.keys(data)
    // console.log(keys);
});

// Now we have the conversations which this user should access.
// Let's fetch them!
// convosRef.once('value', function(snapshot){

// });


// console.log(database.ref('/participants/').equalTo('jurdini01').val());
// database.ref('/participants/').orderByChild('jurdini01').startAt(!null).once('value').then(function (snapshot) {
//     console.log(snapshot.val());
// });


participantsRef.once('value', snapshot => {
    var data = snapshot.val()
    var keys = Object.keys(data)
    // console.log(data);
});

// database.ref('/conversations/').once('value')
//     .then(function (snapshot) {
//         snapshot.forEach(function (childSnapshot) {
//             console.log(childSnapshot.val());
//         })
//     })

// var test = function () {
// Object.keys(conversationList).map(function (key) {
// debugger;
// console.log(conversationList[key]);
// convosRef.on('value', snapshot =>{
//     if (snapshot.val() !== key){
//         console.log(snapshot.val());
//     }
// });
// })
// };



// const conversationsReference = database.ref("users/"+ user_id+"/conversations/");
// conversationsReference.once("value")
//   .then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       // key will be "ada" the first time and "alan" the second time
//       database.ref("/conversations/"+childSnapshot.key).on("value")
//       .then(function(othersnapshot){
//         console.log(othersnapshot.val());
//       })
//     //   var key = childSnapshot.key;
//     //   console.log(key);
//       // childData will be the actual contents of the child
//     //   var childData = childSnapshot.val();
//     //   console.log(childData);
//   });
// });


/*
    Main Wrapper for our Whisper Web App
*/
var AppWrapper = React.createClass({
    getInitialState: function () {
        return {
            conversations: {},
            messages: {},
            availableConversations: {}
        }
    },
    componentDidMount: function () {
        // usersRef.once('value', snapshot => {
        //     // Obtain the conversations of this user
        //     var conversations = Object.keys(snapshot.child("/conversations/").val());
        //     var test = {};
        //     console.log(conversations);
        //     console.log(snapshot.val());
        //     for (var conv_key in conversations) {
        //         console.log(conversations[conv_key]);

        //         database.ref('/conversations/'+conversations[conv_key]).once('value')
        //         .then(function(childSnapshot){
        //             console.log(childSnapshot.val());
        //             // var data = childSnapshot.val();

        //             // var key = Object.keys(data);
        //             // this.setState({conversations: childSnapshot.val()});
        //             // this.state.conversations[key]=data;
        //         });
        //     }
        //     // this.setState({ conversations: this.state.conversations});
        // });
        // usersRef.on('value', snap => snap.forEach((subSnap) => console.log(subSnap.val())));

        var myObject = {};
        usersRef.on('value', function (userSnapshot) {

            // First we get the qty of conversations.
            var conversationCount = userSnapshot.child('conversations').numChildren();
            // we initialize an empty counter
            var conversationLoadedCount = 0;
            // we traverse now the conversations ref with the past conversations.
            userSnapshot.child('conversations').forEach(function (conversationKey) {
                var conversationRef = database.ref('conversations').child(conversationKey.key);
                conversationRef.on('value', function (conversationsSnapshot) {
                    var conversation = conversationsSnapshot.val();

                    conversationLoadedCount = conversationLoadedCount + 1;
                    myObject[conversationKey.key] = conversation;
                    // console.log(conversationKey.key);
                    this.state.conversations[conversationKey.key] = conversation;
                    this.setState({ conversations: this.state.conversations });
                    if (conversationLoadedCount === conversationCount) {
                        console.log("We've loaded all conversations");
                    }
                }.bind(this));
            }.bind(this));
        }.bind(this));
        // this.setState({ conversations: this.state.conversations });
        // this.setState({ conversations: this.state.conversations })
        // this.setState({conversations: this.state.conversations});
        // Load all Sample Conversations
        // convosRef.on('value', snapshot => {
        //     this.setState({ conversations: snapshot.val() });
        // });
        // debugger;
        // this.setState({conversations: myObject});
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
            userid: "pancrasio"
        });
    },
    refreshConversationPanel: function (new_conversation) {
        delete this.state.availableConversations;

        database.ref("messages/" + new_conversation).on("value", snapshot => {
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
        database.ref().update(updates);

    },
    actAsUser: function(){

    },
    render: function () {
        return (
            <div className="row">
            <form onSubmit={this.actAsUser}>
            <input type="text" ref="useridref"/>
            </form>
                <ConversationsSideBar conversations={this.state.conversations} refreshConversationPanel={this.refreshConversationPanel} />
                <ConversationPanel availableConversations={this.state.availableConversations} addNewMessage={this.addNewMessage} />
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
        return <MessageList key={conversationId} index={conversationId} messages={this.props.availableConversations[conversationId]} addNewMessage={this.props.addNewMessage} />
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
                <input type="hidden" ref="user" value={uid} />
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
                <AddMessage addNewMessage={this.props.addNewMessage} conversation_id={this.props.index} />
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
    Routes
*/
var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={AppWrapper} />
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));