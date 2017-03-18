import React from 'react';
/*
    Message Component
    Renders all the messages from a conversation into the DOM
*/
export default class Message extends React.Component {
    componentDidMount() {
        // jQuery to auto scroll to top!!!
        $("#conversationPanel").scrollTop($("#conversationPanel")[0].scrollHeight);
    }
    render() {
        var message_data = this.props.message_data;
        return (
            <div className="p-0" style={{ border: "solid 0.1px gray" }}>
                <div className="message-sender">
                    {message_data.sender}</div>
                <p>{message_data.content}</p>
                <div className="message-timestamp">
                    <i className="fa fa-clock-o mr-1"></i>
                    {message_data.timestamp}
                </div>
            </div>
        )
    }

}