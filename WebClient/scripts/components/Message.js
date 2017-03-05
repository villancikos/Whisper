import React from 'react';
import autobind from 'autobind-decorator';
import h from '../helpers/helpers';
/*
    Message Component
    Renders all the messages from a conversation into the DOM
*/
@autobind
export default class Message extends React.Component {
    render() {
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

}