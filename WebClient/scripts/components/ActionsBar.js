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
    toggleUserDrawer() { 
        console.log("Click ActionBar Button");
        this.props.toggleUserDrawer();
    }
    render() {
        return (
            <div className="action-bar">
                <button onClick={this.toggleUserDrawer} className="btn btn-warning float-right">
                    New Conversation
                </button>
            </div >
        )
    }
}