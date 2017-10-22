import * as React from 'react';
import './PartCol.css';

class PartCol extends React.Component<any,any> {
  render() {
    return (
      <div className="partCol" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',...this.props.style}}>
        <span style={{margin: 'auto auto'}}>{this.props.children}</span>
      </div>
    );
  }
}

export default PartCol
