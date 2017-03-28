import React from 'react';
import h from './helpers/h';
import { ref } from './helpers/firebase';
/*
    Add Message Component
    Will take care of adding new messages to a conversation.
 */
export default class AddMessage extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        // debugger;
        // TODO: get ConversationId or get it from Firebase before anything...
        const conversationId = this.props.i;
        const sender = this.props.auth.uid;
        const participants = this.props.participants[conversationId]
        const receiver = h.getParticipant(conversationId, sender, this.props.participants) || null;
        if (receiver !== null){
            //TODO push to participants object this conversationId.
            this.props.pushParticipants(conversationId, sender, receiver);

        }
        const content = this.refs.content.value;
        const typeOfContent = 'text';
        this.props.pushMessages(conversationId, sender, receiver, content, typeOfContent);
        this.props.pushConversation(conversationId, content, sender)
        this.refs.messageForm.reset();
    }
    render() {
        return (
            <div className="mt-auto" style={{paddingTop:"3em"}}>
                <form onSubmit={(e) => { this.handleSubmit(e) }} ref="messageForm" className="add-message-form" >
                    <input type="text" ref="content" required noValidate />
                    <input type="submit" hidden />
                </form>
            </div>
        )
    }

}


