var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var createBrowserHistory = require('history/lib/createBrowserHistory');


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
            conversationPool: {}
        }
    },

    loadSampleConversationPool: function () {
        this.setState({
            conversationPool: require('../sample-conversations')
        });
    },
    renderConversation: function (key) {
        return <Conversation key={key} index={key} details={this.state.conversationPool.conversations[key]} />
    },
    render: function () {
        return (
            <div className="d-flex">
                <ConversationsSideBar loadSampleConversationPool={this.loadSampleConversationPool} />
                <ul>
                    {Object.keys(this.state.conversationPool).map(this.renderConversation)}
                </ul>
                <ConversationPanel />
            </div>

        )
    }
});

/* 
  ConversationsSideBar
  This will let us make <StorePicker/>
*/

var ConversationsSideBar = React.createClass({
    render: function () {
        return (
            <div>
                <button onClick={this.props.loadSampleConversationPool}>Load Test Convos</button>
            </div>
        )
    }
});

/*
    Conversation 
    In charge of rendering each conversation available on the sidebar
 */
var Conversation = React.createClass({
    render: function () {
        var details = this.props.details;
        return (
            <li>
                {details}
            </li>
        )
    }
});



/* 
    Conversation Panel
    Used to render the conversation history with a contact.
*/

var ConversationPanel = React.createClass({
    render: function () {
        return (
            <div className="col-md-9">
                <h1> Conversation Panel</h1>
            </div>

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