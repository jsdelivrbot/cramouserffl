import Col from './Col';
import * as React from 'react';


class NumberCol extends React.Component<any,any> {
  render() {
    return (
      <Col style={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 25, background: '#29292f', color: '#60606f', borderColor: '#29292f'}}>
        {this.props.children}
      </Col>
    );
  }
}

export default NumberCol
