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
            <div className="conversationSidebar col-lg-4 p-0">
                <div className="nav justify-content-end action-bar">
                    <div className="nav-item">
                        <a href="#" onClick={this.props.showContactsSidebar} className="btn btn-secondary btn-lg">
                            {this.props.ui.leftDrawer
                            ? <i className="fa fa-caret-square-o-left" aria-hidden="true"></i>
                            : <i className="fa fa-user-plus" aria-hidden="true"></i>
                            }
                        </a>
                    </div>
                </div>
                {this.props.ui.leftDrawer ?
                    <UserDrawer {...this.props} />
                    :
                    Object.keys(this.props.conversations).map((i) => <Conversation {...this.props} key={i} i={i} />)
                }
            </div>
        )
    }
}