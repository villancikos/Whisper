import React from 'react';
import { Link } from 'react-router';

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div className="container-fluid">
          {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}
     