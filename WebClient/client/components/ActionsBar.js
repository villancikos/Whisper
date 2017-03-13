import React from 'react';
import autobind from 'autobind-decorator';
import { ref, firebaseAuth } from '../config/firebaseapp';
import UserDrawer from './UserDrawer';

const users = ref.child('users');
/* 
  NewConversation Component
*/
@autobind
export default class ActionsBar extends React.Component {
    showUserDrawer() {
        this.props.showUserDrawer();
    }
    hideUserDrawer() {
        this.props.hideUserDrawer();
    }
    render() {
        if (this.props.userDrawer) {
            return (
                <div className="action-bar">
                    <button onClick={this.hideUserDrawer} className="btn btn-warning float-right">Go Back</button>
                </div>
            )
        }
        return (
            <div className="action-bar">
                <button onClick={this.showUserDrawer} className="btn btn-warning float-right">Start Conversation</button>
            </div>
        )
    }
}