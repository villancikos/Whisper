import React from 'react';
import h from './helpers/h';
/* 
  UserDrawer Component
  This renders the sidebar with all the users available in Whisper
*/
export default class UserDrawer extends React.Component {
    render() {
        return (
            <div>
                <h3 className="pl-3">Select From The List</h3>
                {Object.keys(this.props.users).map((userId) =>
                    <div className="list-group-item" key={userId}
                    // onClick={this.props.startNewConversation.bind(null,userId,h.createRandomId())}
                    onClick={this.props.startNewConversation.bind(null,userId)}
                    // startNewConversation(sender,conversationId,lastMessage,timestamp)
                    >
                        <img style={{height: "45px"}} src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-128.png" alt={`${this.props.users[userId].name} profile pic`} className="rounded-circle mr-2" />
                        <h5>{this.props.users[userId].name}</h5>
                        <small>{this.props.users[userId].email}</small>
                    </div>
                )}
            </div>
        )
    }
}