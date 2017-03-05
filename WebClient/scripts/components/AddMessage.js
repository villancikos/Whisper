import React from 'react';
import h from '../helpers/helpers';
import autobind from 'autobind-decorator';

/*
    Add Message Component
    Will take care of adding new messages to a conversation.
 */
@autobind
export default class AddMessage extends React.Component {
    addNewMessage(event) {
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
    }

    render() {
        return (
            <div className="message-form col-md-12">
                <form ref="messageForm" onSubmit={this.addNewMessage} >
                    <input type="text" ref="content" />
                    <input type="hidden" ref="user" value={this.props.loggedUser} />
                    <input type="hidden" ref="conversation_id" value={this.props.conversation_id} />
                    <button type="submit">Send Message</button>
                </form>
            </div>
        )
    }

}

