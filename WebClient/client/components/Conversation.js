import React from 'react';
/*
    Conversation 
    In charge of rendering each conversation available on the sidebar
 */

export default class Conversation extends React.Component {
    render() {
        const { conversations, i } = this.props  || {};
        if (conversations !== {} && i!=={}) {
            return (
                <div className="list-group-item" onClick={() => { this.props.toggleConversation(i) }}>
                    <div>{conversations[i].last_message}</div>
                    <small>
                        <i className="fa fa-clock-o mr-1"></i>{conversations[i].timestamp}
                    </small>
                </div>
            )
        }
        return (
            <div>It looks like you don't have convos yet :D</div>
        )
    }
}
