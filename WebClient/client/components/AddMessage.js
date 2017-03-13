import React from 'react';
/*
    Add Message Component
    Will take care of adding new messages to a conversation.
 */
export default class AddMessage extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.refs.content.value);
        const conversationId = this.props.i;
        const sender = this.refs.sender.value;
        const content = this.refs.content.value;
        const typeOfContent = 'text';
        const timestamp = Date.now();
        /* 
        Provisional Code for creating Id of Messages. Later we Will
        replace this with a Firebase push for a random id! 
        */
        var messageId = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 22; i++)
            messageId += possible.charAt(Math.floor(Math.random() * possible.length));
        /* 
        End of provisional code for Id of Messages 
        */
        this.props.addMessage(conversationId, messageId, sender, content, typeOfContent, timestamp);
        this.props.updateConversationHeader(conversationId, content, timestamp)
        this.refs.messageForm.reset();
    }
    render() {
        return (
            <div className="mt-auto">
                <form onSubmit={(e) => { this.handleSubmit(e) }} ref="messageForm" className="add-message-form" >
                    <input type="text" ref="content" required noValidate />
                    <input type="hidden" ref="sender" value='pepe' />
                    <input type="hidden" ref="conversation_id" value={this.props.i} />
                    <input type="submit" hidden />
                </form>
            </div>
        )
    }

}


