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
        let uid = this.props.auth.uid;
        let currentConversation = this.props.i || {};
        let currentMessageList = this.props.messages[currentConversation] || {};
        let receiver = h.getReceiver(currentConversation, uid, this.props.participants);
        let receiver_name = this.props.users[receiver].name;
        let profile_pic = this.props.users[receiver].profile_pic;
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
                    <img className="conversation-profile-pic rounded-circle" src={profile_pic}/>
                    {receiver_name}
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
