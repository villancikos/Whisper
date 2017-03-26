import React from 'react';
import h from './helpers/h';
import Message from './Message';
import AddMessage from './AddMessage';
/*
    MessageList
    Will add to state all the messages inside a conversation.
*/

export default class MessageList extends React.Component {
    render() {
        var uid = this.props.auth.uid;
        var currentConversation = this.props.i || {};
        var currentMessageList = this.props.messages[currentConversation] || {};
        var receiver = h.getReceiver(currentConversation, uid, this.props.participants);
        // if (currentConversation !== {}) {
        if (currentConversation !== {}) {
            return (
                // <div>
                //     {Object.keys(this.props.messages[this.props.i]).map((i) =>
                //         <Message key={i} i={i}/>)}
                // </div>
                // {this.props.users[uid].profile_pic}
                <div>
                    <div className="conversation-receiver">
                        
                    </div>
                    <div className="d-flex flex-column conversation-container">
                        {Object.keys(currentMessageList).map((messageId) =>
                            <Message key={messageId} i={messageId} message_data={currentMessageList[messageId]} loggedUser={uid} />)
                        }
                        <AddMessage i={currentConversation} {...this.props} />
                    </div>
                </div>
            )
        }
    }
}
