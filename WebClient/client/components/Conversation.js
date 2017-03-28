import React from 'react';
import h from './helpers/h';
/*
    Conversation 
    In charge of rendering each conversation available on the sidebar
 */

export default class Conversation extends React.Component {
    render() {
        const { conversations, i} = this.props || {};

        let participants = this.props.participants;

        if (conversations !== {} && i !== {}) {
            let uid = this.props.auth.uid;
            let timestamp = conversations[i].timestamp;
            let last_message = conversations[i].last_message;
            let participant = h.getParticipant(i, uid, participants)||' ';
            let participant_name = this.props.users[participant].name;
            let profile_pic = this.props.users[participant].profile_pic;
            return (
                <div className=
                    {`list-group-item${Object.keys(this.props.currentConversation)[0] === i
                        ? ' active' : ''}`}
                    onClick={() => { this.props.toggleConversation(i) }}
                >
                    <img className="rounded-circle mr-2 conversation-profile-pic" src={profile_pic} />
                    <div className="conversation-sender">
                        {participant_name}
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
