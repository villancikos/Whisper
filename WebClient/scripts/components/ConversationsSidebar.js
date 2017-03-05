import React from 'react';
import Conversation from './Conversation';
import autobind from 'autobind-decorator';
import NewConversation from './NewConversation';
/* 
  ConversationsSidebar
*/
@autobind
export default class ConversationsSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewMessage: true,
        }
    }
    renderConversation(key) {
        return <Conversation key={key} index={key} details={this.props.conversations[key]} refreshConversationPanel={this.props.refreshConversationPanel} />
    }
    start(e) {
        e.preventDefault();
        this.setState({ addNewMessage: !this.state.addNewMessage });
    }
    render() {
        var addNewMessage = this.state.addNewMessage;
        if (addNewMessage) {
            return (

                <div className="col-md-4">
                    <div>
                        <a className="btn btn-primary" onClick={this.start}>New Conversation</a>
                    </div>
                    <NewConversation />
                </div>
            )
        }
        return (
            <div className="col-md-4">
                <div>
                    <a className="btn btn-primary" onClick={this.start}>New Conversation</a>
                </div>
                <div className="conversations">
                    <ul className="list-group">
                        {Object.keys(this.props.conversations).map(this.renderConversation)}
                    </ul>
                </div>
            </div>
        )
    }
}