var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var createBrowserHistory = require('history/lib/createBrowserHistory');

// Our helpers function to reduce code in main app
var h = require('./helpers');

/* Firebase */
var firebase = require('firebase');
var firebaseConfig = require('../firebaseconfig')
// var firebaseApp = firebase.initializeApp(firebaseConfig);

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
        this.setState({
            conversations: require('../samples/sample-conversations'),
            // messages: require('../sample-messages')
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

            }
        });
    },
    refreshConversationPanel: function (new_conversation) {
        delete this.state.availableConversations;
        if (new_conversation === 'conversation0001') {
            this.setState({ availableConversations: require('../samples/conversation0001') });
        }
        else if (new_conversation === 'conversation0002') {
            this.setState({ availableConversations: require('../samples/conversation0002') });
        }
        else if (new_conversation === 'conversation0003') {
            this.setState({ availableConversations: require('../samples/conversation0003') });
        }
        else if (new_conversation === 'conversation0004') {
            this.setState({ availableConversations: require('../samples/conversation0004') });
        }
        else {
            this.setState({ availableConversations: {} });
        }


    },
    getDefaultProps: function () {
        var thisconvo = this.loadSampleConversations
        return {
        }
    },
    render: function () {
        return (
            <div className="row">
                <ConversationsSideBar conversations={this.state.conversations} refreshConversationPanel={this.refreshConversationPanel} />
                <ConversationPanel availableConversations={this.state.availableConversations} />
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
        console.log("Emulating that on click, that conversation will render on right side");
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
        return <MessageList key={conversationId} index={conversationId} messages={this.props.availableConversations[conversationId]} />
    },
    render: function () {
        return (
            <div className="conversation-panel">
                <div className="">
                    {Object.keys(this.props.availableConversations).map(this.getMessageList)}
                </div>
                <AddMessage />
            </div>
        )
    }
});

var AddMessage = React.createClass({
    render: function(){
        return (
            <form>
            <input type="text"/>
            <button type="">Send Message</button>
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
        return (
            <div><ul>
                {Object.keys(this.props.messages).map(this.renderMessage)}</ul>
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