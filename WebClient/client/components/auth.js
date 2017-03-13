import React from 'react'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { ref, firebaseAuth } from '../config/firebaseapp'
const firebaseUI = new firebaseui.auth.AuthUI(firebaseAuth);

export default class FirebaseUi extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var uiConfig = {
            'tosUrl':
                'https://www.google.com'
            ,
            'callbacks': {
                'signInSuccess': function (user) {
                    console.log(user);
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
        return (
            <div id="firebaseui-auth">...</div>
        );
    }
};