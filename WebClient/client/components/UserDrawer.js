import React from 'react';
import h from './helpers/h';
/* 
  UserDrawer Component
  This renders the sidebar with all the users available in Whisper
*/
export default class UserDrawer extends React.Component {
    filterUsers(term){
        console.log(term);
        filteredUsers = {};

    }
    render() {
        // we don't need the sender
        let users = this.props.users;
        // so we get rid of it
        delete users[this.props.auth.uid];
        return (
            <div>
                <h4 className="pl-3">Select User From The List</h4>
                <input placeholder="Or search ..." className="search-bar" type="text" onChange={(event) => this.filterUsers(event.target.value)}/>
                
                {Object.keys(users).map((receiver) =>
                    <div className= "list-group-item" key={receiver}
                    onClick={this.props.startNewConversation.bind(null,this.props.auth.uid,receiver,this.props.participants)}
                    >
                        <img style={{height: "45px"}} src={this.props.users[receiver].profile_pic} alt={`${this.props.users[receiver].name} profile pic`} className="rounded-circle mr-2" />
                        <h5>{this.props.users[receiver].name}</h5>
                        <small>{this.props.users[receiver].email}</small>
                    </div>
                )}
            </div>
        )
    }
}