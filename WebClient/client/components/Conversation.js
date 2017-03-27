import React from 'react';
import h from './helpers/h';
/*
    Conversation 
    In charge of rendering each conversation available on the sidebar
 */

export default class Conversation extends React.Component {
    render() {
        const { conversations, i } = this.props  || {};
        if (conversations !== {} && i!=={}) {
            return (
                <div className=
                    {`list-group-item${Object.keys(this.props.currentConversation)[0]===i
                    ?' active':''}`}
                    onClick={() => { this.props.toggleConversation(i) }}
                >   <div><strong>{conversations[i].sender}</strong></div>
                    <div>{conversations[i].last_message}</div>
                    <small>
                        <i className="fa fa-clock-o mr-1"></i>{h.formatTime(conversations[i].timestamp)}
                    </small>
                </div>
            )
        }
        return (
            <div>It looks like you don't have convos yet :D</div>
        )
    }
}
