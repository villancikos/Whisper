import React from 'react';
import ConversationsSidebar from './ConversationsSidebar';
import ConversationPanel from './ConversationPanel';

export default class Main extends React.Component {
  render() {
    return (
      <div className="row">
        <ConversationsSidebar {...this.props} />
        <ConversationPanel {...this.props} />
      </div>
    )
  }
}
