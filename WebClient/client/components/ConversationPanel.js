import React from 'react';
import Conversation from './Conversation';
import MessageList from './MessageList';
/* 
    Conversation Panel
    Used to render the conversation that the user clicked and is 
    currently interacting on.
*/
export default class ConversationPanel extends React.Component {
    render() {
        var currentConversation = this.props.currentConversation
        if (currentConversation !== '') {
            return (
                <div id="conversationPanel" className="d-flex flex-column col-md-7 p-0">
                    <div>
                        {Object.keys(currentConversation).map((i) =>
                            <MessageList {...this.props} key={i} i={i} />)}
                    </div>
                </div>
            )
        }
        return (
            <div id="conversationPanel" className="col-md-7">
                <div>
                    <p>Start a new conversation or click on the conversation sidebar to see the messages.</p>
                </div>
            </div>
        )
    }
}