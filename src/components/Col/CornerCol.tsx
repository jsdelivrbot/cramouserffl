import Col from './Col';
import * as React from 'react';


class CornerCol extends React.Component<any,any> {
  render() {
    return (
      <Col style={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 25, height: 25, background: '#29292f', color: '#60606f', borderColor: '#29292f'}}>
        {this.props.children}
      </Col>
    );
  }
}

export default CornerCol
