import * as React from 'react';
import './Col.css';

class Col extends React.Component<any,any> {
  render() {
    let bg
    return (
      <div onClick={() => {this.props && this.props.onClick && this.props.onClick()}} className="col" style={{backgroundColor: bg, ...this.props.style}}>
        {this.props.children}
      </div>
    );
  }
}

export default Col
