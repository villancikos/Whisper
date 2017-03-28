import React from 'react';
import h from './helpers/h';
/*
    Conversation 
    In charge of rendering each conversation available on the sidebar
 */

export default class Conversation extends React.Component {
    render() {
        const { conversations, i } = this.props || {};
        if (conversations !== {} && i !== {}) {
            let sender = conversations[i].sender;
            let sender_name = this.props.users[sender].name;
            let timestamp = conversations[i].timestamp;
            let last_message = conversations[i].last_message;
            let receiver = h.getReceiver(i,sender,this.props.participants);
            let profile_pic = this.props.users[receiver].profile_pic;
            return (
                <div className=
                    {`list-group-item${Object.keys(this.props.currentConversation)[0] === i
                        ? ' active' : ''}`}
                    onClick={() => { this.props.toggleConversation(i) }}
                >
                <img className="rounded-circle mr-2 conversation-profile-pic" src={profile_pic}/>
                {this.props.auth.uid === sender
                ?
                <div className="conversation-sender">
                you:
                </div>
                :
                <div className="conversation-sender">
                    {sender_name} said 
                </div>
                }
                    <div className="conversation-last-message">{last_message}</div>
                    <div className="conversation-timestamp">
                        <i className="fa fa-clock-o mr-1"></i>{h.formatTime(timestamp)}
                    </div>
                </div>
            )
        }
        return (
            <div>It looks like you don't have convos yet :D</div>
        )
    }
}
