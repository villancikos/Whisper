import React from 'react';
import ConversationsSidebar from './ConversationsSidebar';
import ConversationPanel from './ConversationPanel';

const Main = React.createClass({
  render() {
    return (
      <div className="row">
        <ConversationsSidebar {...this.props} />
        <ConversationPanel {...this.props} />
      </div>
    )
  }
});

export default Main;
