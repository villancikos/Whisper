import React from 'react';
import h from './helpers/h';
/*
    Add Message Component
    Will take care of adding new messages to a conversation.
 */
export default class AddMessage extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.refs.content.value);
        const conversationId = this.props.i||h.createRandomId();
        const sender = this.refs.sender.value;
        const content = this.refs.content.value;
        const typeOfContent = 'text';
        const timestamp = Date.now();
        this.props.pushMessages(conversationId, sender, content, typeOfContent, timestamp);
        this.props.pushConversation(conversationId, content, timestamp)
        this.refs.messageForm.reset();
    }
    render() {
        return (
            <div className="mt-auto">
                <form onSubmit={(e) => { this.handleSubmit(e) }} ref="messageForm" className="add-message-form" >
                    <input type="text" ref="content" required noValidate />
                    <input type="hidden" ref="sender" value='pepe' />
                    <input type="submit" hidden />
                </form>
            </div>
        )
    }

}


