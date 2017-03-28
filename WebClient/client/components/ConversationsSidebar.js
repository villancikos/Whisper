import React from 'react';
import Conversation from './Conversation';
import UserDrawer from './UserDrawer';
import { ref, fAuth } from './helpers/firebase'

/* 
  ConversationsSidebar
*/

export default class ConversationsSidebar extends React.Component {
    signOut() {
        fAuth.signOut();
        let d = "http://"+window.location.host;
        window.location.replace(d)
    }
    render() {
        return (
            <div className="conversationSidebar col-lg-4 p-0">
                <div className="nav nav-fill action-bar">
                    <div className="nav-item">
                        <a href="#" onClick={this.signOut} className="btn btn-danger btn-lg" style={{ color: '#fff' }}>
                            <i className="fa fa-power-off" aria-hidden="true"></i>
                        </a>
                    </div>
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
            </div >
        )
    }
}