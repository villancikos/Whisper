import React from 'react';
import h from '../helpers/helpers';
import autobind from 'autobind-decorator';
import { ref, firebaseAuth } from '../config/firebaseapp';
import ConversationsSidebar from './ConversationsSidebar';
import ConversationPanel from './ConversationPanel';
import ActionsBar from './ActionsBar';
import UserDrawer from './UserDrawer';
import AddMessage from './AddMessage';

// Constants Used across the entire app.
const convosRef = ref.child("conversations");
const messageRef = ref.child("messages");
const participantsRef = ref.child("participants/");



/*
    Main Wrapper for our Whisper Web App
*/
@autobind
export default class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: {},
            messages: {},
            availableConversations: {},
            loggedUser: '',
            userDrawer: false,
            activeConversation: false,
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            var loggedUser = null;
            if (user) {
                loggedUser = user.uid;
            }
            this.state.loggedUser = loggedUser || null;
            this.setState({
                loggedUser: this.state.loggedUser
            });
            if (this.state.loggedUser !== null) {
                var userConversations = ref.child("users/" + this.state.loggedUser);
                userConversations.on('value', userSnapshot => {
                    userSnapshot.child('conversations').forEach(conversationKey => {
                        var conversationRef = convosRef.child(conversationKey.key);
                        conversationRef.on('value', conversationsSnapshot => {
                            var conversation = conversationsSnapshot.val();
                            this.state.conversations[conversationKey.key] = conversation;
                            this.setState({ conversations: this.state.conversations });
                        });
                    });
                });
            }
        });
        this.setState({
            participants: {
                conversation0001: {
                    ramiri01: true,
                    jurdin01: true
                },
                conversation0002: {
                    lucas02: true,
                    jurdini01: true
                },
            },
            availableConversations: {

            },
        });

    }

    refreshConversationPanel(new_conversation) {
        delete this.state.availableConversations;
        ref.child("messages/" + new_conversation).on("value", snapshot => {
            var obj = {}
            obj[new_conversation] = snapshot.val()
            this.setState({ availableConversations: obj })
        });


    }
    promptConversationStarter(conversationKey, userKey) {
        delete this.state.availableConversations;
        this.setState({
            availableConversations: {}
        });
        this.toggleActiveConversation(conversationKey);
    }
    addNewMessage(conversation_id, message_id, message_data) {
        // update the state object
        this.state.availableConversations[conversation_id][message_id] = message_data;
        // now set the state.
        this.setState({ availableConversations: this.state.availableConversations });

        // Update Conversation on Firebase.
        // Write the new post's data simultaneously in the posts list and the user's post list.
        // debugger;
        var update_conversation = {
            last_message: message_data.content,
            timestamp: message_data.timestamp,
            sender: message_data.sender
        }
        var updates = {};
        updates['/messages/' + conversation_id + "/" + message_id] = message_data;
        updates['/conversations/' + conversation_id] = update_conversation;
        ref.update(updates);

    }
    toggleUserDrawer() {
        this.setState({ userDrawer: !this.state.userDrawer });
    }
    toggleActiveConversation(index) {
        this.setState({ currentConversation: index });
        this.setState({ activeConversation: !this.state.activeConversation });
    }
    render() {
        return (
            <div className="row app-wrapper">
                <div className="col-md-5 left-side">
                    <div className="">
                        <ActionsBar toggleUserDrawer={this.toggleUserDrawer} loggedUser={this.state.loggedUser} />
                    </div>
                    <div className="col-md-5">
                        {this.state.userDrawer ?
                            <UserDrawer loggedUser={this.props.loggedUser} toggleUserDrawer={this.toggleUserDrawer}
                                promptConversationStarter={this.promptConversationStarter} />
                            :
                            <ConversationsSidebar conversations={this.state.conversations} refreshConversationPanel={this.refreshConversationPanel} loggedUser={this.state.loggedUser} toggleActiveConversation={this.toggleActiveConversation} />
                        }
                    </div>

                </div>

                <div className="col-md-7 right-side">
                    <ConversationPanel availableConversations={this.state.availableConversations} />
                    {this.state.activeConversation ?
                        <AddMessage addNewMessage={this.addNewMessage} conversation_id={this.state.currentConversation} loggedUser={this.state.loggedUser} />
                        : null}
                </div>

            </div>
        )
    }
}