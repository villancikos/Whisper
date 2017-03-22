import React from 'react';
import Message from './Message';
import AddMessage from './AddMessage';
/*
    MessageList
    Will add to state all the messages inside a conversation.
*/

export default class MessageList extends React.Component {
    render() {
        var currentConversation = this.props.i || {}
        var currentMessageList = this.props.messages[currentConversation] || {}
        // if (currentConversation !== {}) {
        if (currentConversation !== {}) {
            return (
                // <div>
                //     {Object.keys(this.props.messages[this.props.i]).map((i) =>
                //         <Message key={i} i={i}/>)}
                // </div>
                <div className="d-flex flex-column">
                    {Object.keys(currentMessageList).map((messageId) =>
                        <Message key={messageId} i={messageId} message_data={currentMessageList[messageId]} loggedUser={this.props.auth.uid} />)
                    }
                    <AddMessage i={currentConversation} {...this.props} />
                </div>
            )
        }
    }
}
