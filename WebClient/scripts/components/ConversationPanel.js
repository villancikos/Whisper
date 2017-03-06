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
        return <MessageList key={conversationId} index={conversationId} messages={this.props.currentActiveConversation[conversationId]} />
    }

    render() {
        var currentActiveConversation = this.props.currentActiveConversation || {}
        if (currentActiveConversation !== {}) {
            return (
                <div className="conversation-panel">
                    <div>
                        {Object.keys(this.props.currentActiveConversation).map(this.getMessageList)}
                    </div>
                </div>
            )
        }
        return (
            <div className="conversation-panel">
                <div>
                    <p>Start a new conversation or click on the conversation sidebar to see the messages.</p>
                </div>
            </div>
        )
    }
}