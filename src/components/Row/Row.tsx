import * as React from 'react';
import './Row.css';

class Row extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}

export default Row;
