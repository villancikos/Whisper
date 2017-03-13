import React from 'react'
import { ref, firebaseAuth } from '../config/firebaseapp'
import FirebaseUi from './auth'
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      user: '',
    }
  }

  authUser() {
    console.log("Auth User function...")

  }
  componentWillMount(){
    firebaseAuth.onAuthStateChanged(user =>{
      if (user){
        this.state.user = user.uid;
      }
    });
  }
  render() {
    const divStyle = {
      color: 'black',
      backgroundColor: 'gray',
      border: 'solid'
      ,
    };
    const inverseColor = {
      backgroundColor: '#333',
      borderColor: '#333',
    }

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-inverse" style={inverseColor}>
            <div className="card-block">
              <h3 className="card-title">Welcome to Whisper.</h3>
              <p className="card-text">Please login in order to access your conversations.</p>
              {this.state.authed
                ? <button className="btn btn-primary"
                  onClick={() => {
                    this.setState({ authed: false })

                  }}
                >Logout</button>
                : <button className="btn btn-primary"
                  onClick={() => {
                    this.setState({ authed: true });
                    this.authUser();
                  }}>Log In
                      </button>}
              <a href="#" className="btn btn-default float-right">Not Yet Registered?</a>
            </div>
          </div>
        </div>
        <div className="col-md-12">
        <FirebaseUi/>
        </div>
      </div>
    );
  }
}
