import React from 'react';
import h from './helpers/h';
/*
    Add Message Component
    Will take care of adding new messages to a conversation.
 */
export default class AddMessage extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        const conversationId = this.props.i || h.createRandomId();
        const sender = this.refs.sender.value;
        const participants = this.props.participants[conversationId]
        const receiver = h.getReceiver(conversationId, sender, this.props.participants);
        const content = this.refs.content.value;
        const typeOfContent = 'text';
        console.log(receiver);
        this.props.pushMessages(conversationId, sender, receiver, content, typeOfContent);
        this.props.pushConversation(conversationId, content, sender)
        this.refs.messageForm.reset();
    }
    render() {
        return (
            <div className="mt-auto">
                <form onSubmit={(e) => { this.handleSubmit(e) }} ref="messageForm" className="add-message-form" >
                    <input type="text" ref="content" required noValidate />
                    <input type="hidden" ref="sender" value={this.props.auth.uid} />
                    <input type="submit" hidden />
                </form>
            </div>
        )
    }

}


