import React from 'react';
import { Link } from 'react-router';

class AppWrapper extends React.Component{
    render() {
        return (
            <div>
                <h1>
                    <Link to="/">Whisper</Link>
                </h1>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        )
    }
}

export default AppWrapper;