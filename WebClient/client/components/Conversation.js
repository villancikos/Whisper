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
            let timestamp = conversations[i].timestamp;
            let last_message = conversations[i].last_message;
            let receiver = h.getReceiver(i,this.props.auth.uid,this.props.participants)|| '';
            let receiver_name = this.props.users[receiver].name||'';
            let profile_pic = this.props.users[receiver].profile_pic;
            return (
                <div className=
                    {`list-group-item${Object.keys(this.props.currentConversation)[0] === i
                        ? ' active' : ''}`}
                    onClick={() => { this.props.toggleConversation(i) }}
                >
                <img className="rounded-circle mr-2 conversation-profile-pic" src={profile_pic}/>
                <div className="conversation-sender">
                    {receiver_name}
                </div>
                    <div className="conversation-last-message">{h.trunctateText(last_message)}</div>
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
