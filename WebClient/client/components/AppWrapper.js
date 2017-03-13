import React from 'react';
import { Link } from 'react-router';

const AppWrapper = React.createClass({
  render() {
    return (
      <div className="container-fluid">
          {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
});

export default AppWrapper;

        