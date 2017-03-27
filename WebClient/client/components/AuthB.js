import React from 'react'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { ref, fAuth } from './helpers/firebase'
const firebaseUI = new firebaseui.auth.AuthUI(fAuth);

export default class FirebaseUi extends React.Component {
    componentDidMount() {
        var uiConfig = {
            'tosUrl':
            ''
            ,
            'callbacks': {
                'signInSuccess': function (user) {
                    this.props.auth.uid = user.uid;
                }
            },
            'signInOptions': [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        firebaseUI.start('#firebaseui-auth', uiConfig);
    }

    componentWillUnmount() {
        firebaseUI.reset()
    }

    render() {
        if (this.props.auth.uid === undefined) {
            return (
                <div id="firebaseui-auth">...</div>
            )
        }
        return (
            <h1>test</h1>
        );
    }
};