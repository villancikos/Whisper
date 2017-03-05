import React from 'react';
import autobind from 'autobind-decorator';
import h from '../helpers/helpers';
/*
    Conversation 
    In charge of rendering each conversation available on the sidebar
 */

export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
    }
    retrieveConversation(index) {
        // In this section we add the state to the message.
        // So this is the best place to call the conversation from firebase.
        this.props.refreshConversationPanel(index);
    }

    render() {
        var last_message = this.props.details.last_message;
        var time = h.formatTime(this.props.details.timestamp);
        var index = this.props.index;
        return (
            <li className="list-group-item"
                onClick={this.retrieveConversation.bind(this, index)}>
                <div>
                    <p>{last_message}</p>
                    <pre>{time}</pre>
                </div>
            </li>
        )
    }
}