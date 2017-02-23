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
            conversations: {}
        }
    },
    componentDidMount: function(){
         this.setState({
            conversations: require('../sample-conversations')
        });
    },
    getDefaultProps: function(){
        var thisconvo = this.loadSampleConversations
        return {
            // this.setState({conversations: thisconvo})
        }
    },

    loadSampleConversations: function () {
        this.setState({
            conversations: require('../sample-conversations')
        });
    },
    render: function () {
        // console.log(this.state.conversations);
        return (
            <div className="row">
                <ConversationsSideBar conversations={this.state.conversations} />
                <ConversationPanel loadSampleConversations={this.loadSampleConversations} />
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
        return <Conversation key={key} index={key} details={this.props.conversations[key]} />
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
    formatTime: function(time){
        var dateObj = new Date(time);
        var now = Date.now();
        var elapsed = now - time;
        var filter = 60*60*24*1000; // one day
            console.log(now);
            console.log(elapsed);
            console.log(filter);
        if (elapsed >= filter){
            return dateObj.getDate()+"/"+dateObj.getMonth()+"/"+dateObj.getFullYear();
        }
        return dateObj.getHours()+":"+dateObj.getMinutes();

    },
    render: function () {
        var last_message = this.props.details.last_message;
        var time = this.formatTime(this.props.details.timestamp);
        // console.log(details);
        return (
            <li>
                <p>{last_message}</p>
                <pre>{time}</pre>
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
            <div className="col-md-8">
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