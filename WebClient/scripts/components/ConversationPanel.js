import React from 'react';
import Conversation from './Conversation';
import autobind from 'autobind-decorator';
import MessageList from './MessageList';
/* 
    Conversation Panel
    Used to render the conversation that the user clicked and is 
    currently interacting on.
*/
@autobind
export default class ConversationPanel extends React.Component {
    getMessageList(conversationId) {
        return <MessageList key={conversationId} index={conversationId} messages={this.props.availableConversations[conversationId]} addNewMessage={this.props.addNewMessage} loggedUser={this.props.loggedUser} />
    }

    render() {
        return (
            <div className="col-md-8 conversation-panel">
                <div className="">
                    {Object.keys(this.props.availableConversations).map(this.getMessageList)}
                </div>

            </div>
        )
    }

}