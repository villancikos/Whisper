import React from 'react';
import Conversation from './Conversation';
import UserDrawer from './UserDrawer';
// import firebase from 'firebase';
// import firebaseui from 'firebaseui';
// import { ref, fAuth } from './helpers/firebase';
// const firebaseUI = new firebaseui.auth.AuthUI(fAuth);
/* 
  ConversationsSidebar
*/

export default class ConversationsSidebar extends React.Component {
    render() {
        return (
            <div className="conversationSidebar col-md-5 p-0">
                <div className="nav justify-content-end">
                    <div className="nav-item">
                        <button onClick={this.props.showContactsSidebar} className="btn btn-primary">
                            {this.props.ui.leftDrawer ? "Back to Conversations" : "Search Contacts"}
                        </button>
                    </div>
                </div>
                {this.props.ui.leftDrawer ?
                    <UserDrawer {...this.props}/>
                    :
                    Object.keys(this.props.conversations).map((i) => <Conversation {...this.props} key={i} i={i} />)
                }
            </div>
        )
    }
}