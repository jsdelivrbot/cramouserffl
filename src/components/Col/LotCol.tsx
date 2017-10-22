import { ILot, Types } from '../../api/get';
import PartCol from './PartCol';
import Col from './Col';
import * as React from 'react';
import './Col.css';
import './LotCol.css'
import './PartCol.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

interface IProps {
  lot: ILot
  selectLot: Function
}
const Fade = ({ children, ...props }: any) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);
class LotCol extends React.Component<IProps,any> {
  render() {
    let bg = this.props && this.props.lot ? '#b0eaf2' : '#555'
    let floors = this.props && this.props.lot && this.props.lot.floors ? this.props.lot.floors : []
    const onClick = this.props && this.props.selectLot ? this.props.selectLot : () => {}
    
    let partCols = []
    for(let i = floors.length -1; i >= 0 ; i--) {
      let f = floors[i]
      if(typeof f.floor === 'undefined' || f.floor === null)
        continue
      let partColBg = ''
      let partColColor = 'white'
      switch(f.type) {
        case Types.Flexi:
          partColBg = '#17A086'
          break
        case Types.shed:
          partColBg = '#9A59B5'
          break
        case Types.staffWagon:
          partColBg = '#F1C50E'
          partColColor = '#000000'
          break
        case Types.toilet:
          partColBg = '#C1392D'
          break
        case Types.shed:
          partColBg = '#e67e22'
          break
        case Types.container:
          partColBg = '#e67e22'
          partColColor = '#000000'
          break;
        case Types.other:
          partColBg = '#3F51B5'
          break;
        default:
          partColBg = '#34495e'
      }
      console.log(f)
      partCols.push(<Fade key={f.floor}><PartCol key={f.floor} style={{background: partColBg, fontSize: 10, textAlign: 'center', color: partColColor}}>{f.individual}</PartCol></Fade>)
    }
    return (
      <Col onClick={() => {onClick(this.props && this.props.lot && this.props.lot.id ? this.props.lot.id : null)}} style={{background: bg, alignItems: 'center'}}>
        <TransitionGroup className='container'>
          {partCols}
        </TransitionGroup>
      </Col>
    );
  }
}

export default LotCol
