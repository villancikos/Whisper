import React from 'react';
import autobind from 'autobind-decorator';
import Message from './Message';
import AddMessage from './AddMessage';
/*
    MessageList
    Will add to state all the messages inside a conversation.
*/
@autobind
export default class MessageList extends React.Component {
    renderMessage(message_id) {
        return <Message index={message_id} key={message_id} message_data={this.props.messages[message_id]} />
    }

    render() {
        //  TODO: Add try catch if conversation is empty.
        return (
            <div>
                <ul>
                    {Object.keys(this.props.messages).map(this.renderMessage)}
                </ul>
                <div>
                    <ul>
                        {Object.keys(this.props.messages).map(this.renderMessage)}
                    </ul>
                    <AddMessage addNewMessage={this.props.addNewMessage} conversation_id={this.props.index} loggedUser={this.props.loggedUser} />
                </div>
            </div>
        )
    }
}
