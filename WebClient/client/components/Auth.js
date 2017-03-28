import React from 'react'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { ref, fAuth } from './helpers/firebase'
const firebaseUI = new firebaseui.auth.AuthUI(fAuth);


export default class FirebaseUi extends React.Component {
    signOut() {
        fAuth.signOut();
        window.location.reload();
    }
    componentDidMount() {
        let uiConfig = {
            signInSuccessUrl: document.location.origin+"/web",
            tosUrl: 'www.whisper.com',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccess: (currentUser) => {
                    if (currentUser) {
                        let email = currentUser.email;
                        let uid = currentUser.uid;
                        let profile_pic = currentUser.photoURL;
                        let name = currentUser.displayName;
                        this.props.registerUser(
                            email,
                            uid,
                            profile_pic,
                            name
                        )
                    }
                    return true;
                }
            }
        }
        firebaseUI.start('#firebaseui-auth', uiConfig);
    }

    componentWillUnmount() {
        firebaseUI.reset()
    }

    render() {
        return (
            <div>
                {this.props.auth.uid !== null?
                <button onClick={this.signOut}>Sign Out</button>
                :
                <div id="firebaseui-auth"></div>
                }
            </div>
        )
    }
};