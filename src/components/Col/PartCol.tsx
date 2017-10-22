import * as React from 'react';
import './PartCol.css';

class PartCol extends React.Component<any,any> {
  render() {
    return (
      <div className="partCol" style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default PartCol
