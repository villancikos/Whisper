import React from 'react';
import Conversation from './Conversation';
import autobind from 'autobind-decorator';
/* 
  ConversationsSidebar
*/
@autobind
export default class ConversationsSidebar extends React.Component {
    renderConversation(key) {
        return <Conversation key={key} index={key} details={this.props.conversations[key]} refreshConversationPanel={this.props.refreshConversationPanel} showActiveConversation={this.props.showActiveConversation} />
    }
    render() {
        return (
            <div>
                <div className="conversations">
                    <ul className="list-group">
                        {Object.keys(this.props.conversations).map(this.renderConversation)}
                    </ul>
                </div>
            </div>
        )
    }
}