import React from 'react';
import Conversation from './Conversation';
import autobind from 'autobind-decorator';
/* 
  ConversationsSidebar
*/
@autobind
export default class ConversationsSidebar extends React.Component {
    renderConversation(key) {
        return <Conversation key={key} index={key} details={this.props.conversations[key]} refreshConversationPanel={this.props.refreshConversationPanel} />
    }
    render() {
        return (
            <div className="col-md-4">
                <ul>
                    {Object.keys(this.props.conversations).map(this.renderConversation)}
                </ul>
            </div>
        )
    }
}