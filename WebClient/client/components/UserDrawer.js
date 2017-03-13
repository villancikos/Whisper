import React from 'react';
/* 
  UserDrawer Component
  This renders the sidebar with all the users available in Whisper
*/
export default class UserDrawer extends React.Component {
    render() {
        return (
            <div>
                <h3 className="pl-3">Select From The List</h3>
                {Object.keys(this.props.users).map((i) =>
                    <div className="list-group-item" key={i}
                    onClick={this.props.startNewConversation.bind(null,i,'conversation000000000x','fulano estuvo aqui','1489414104330')}
                    >
                        <img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-128.png" alt={`${this.props.users[i].name} profile pic`} className="rounded-circle" />
                        <h5>{this.props.users[i].name}</h5>
                        <small>{this.props.users[i].email}</small>
                    </div>
                )}
            </div>
        )
    }
}