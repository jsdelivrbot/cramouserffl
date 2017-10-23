import AppBar from './components/AppBar';
import LotDialog from './components/LotDialog/LotDialog';
import LotCol from './components/Col/LotCol';
import CornerCol from './components/Col/CornerCol';
import LetterCol from './components/Col/LetterCol';
import { getLots, ILot, updateLot } from './api/get';
import NumberCol from './components/Col/NumberCol';
import { config } from './config'
import Row from './components/Row/Row'
import * as React from 'react';
import './App.css';
import Transition from 'react-transition-group/Transition';
import * as io from 'socket.io-client'
let socket = io('https://mighty-beyond-46233.herokuapp.com', {secure: true})

const transitionStyles = {
  entering: { opacity: 0.1, transform: 'translate3d(-100vw,0,0)' },
  exiting: { opacity: 0, transform: 'translate3d(-100vw,0,0)' },
  exited: { opacity: 0, transform: 'translate3d(-100vw,0,0)' },
  entered: { opacity: 1, transform: 'translate3d(0px,0,0)'},
}

const duration = 250
const defaultDialogStyle = {
  transform: 'translateZ(0)',
  transition: `${duration}ms ease-in-out`,
  transitionProperty: 'opacity, transform',
  opacity: 0,
}
const FadeDialog = ({ in: inProp, selectedLot, onClose, onSave }: any) => (
  <Transition unmountOnExit={true} in={inProp} timeout={duration}>
    {(state: any) => {
     return (
        <LotDialog lot={selectedLot} onClose={() => onClose()} onSave={(lot: ILot) => onSave(lot)} style={{...defaultDialogStyle, ...transitionStyles[state] }}/>
    )}}
  </Transition>
);
class App extends React.Component<any,any> {
  constructor(props: any) {
    super(props)
    this.state = {selectedLot: null, dialog: false}
  }
  async componentDidMount() {
    socket.on('update', async () => {
      this.setState(await getLots())
    })
    this.setState(await getLots())
  }
  getMatchingLot(row: string, col: number) {
    let lots = this.state && this.state.lots || []
    for(let lot of lots) {
      if(lot.row == row && lot.col === col){
       return lot
      }
    }
  } 
  async onSave(lot: ILot){
    await updateLot({lot})
  }
  closeDialog() {
    this.setState({dialog: false})
  }
  openDialog() {
    this.setState({dialog: true})
  }
  render() {
    

    const selectLot = (id: number | null) => {
      let lots = this.state && this.state.lots || []
      for(let lot of lots) {
        if(lot.id == id) {
          return this.setState({dialog: true, selectedLot: lot})
        }
      }
      this.setState({dialog: false})
    }
    const rows = []
    // const showDialog = this.state && this.state.selectedLot !== null ? true : false
    const selectedLot = this.state && this.state.selectedLot !== null ? this.state.selectedLot : null
    const numberCols = [
      <CornerCol key={-1}>
      </CornerCol>
    ]
    for(let i = 0; i< config.cols; i++) {
      numberCols.push(
        <NumberCol key={i}>
          {i}
        </NumberCol>
        )
    }
    for(let r = 0; r < config.rows; r++) {
      let cols = []
      cols.push(
        <LetterCol key={String.fromCharCode(97 + r).toUpperCase()}>{String.fromCharCode(97 + r).toUpperCase()}</LetterCol>
      )
      for(let c = 0; c < config.cols; c++){
        cols.push(
          <LotCol key={`${String.fromCharCode(97 + r).toUpperCase()}${c}`} selectLot={selectLot} lot={this.getMatchingLot(String.fromCharCode(97 + r), c)} > </LotCol>
        )
      }
      rows.push(<Row key={r}>{cols}</Row>)
    }
    return (
      <div style={this.state.dialog ? {position: 'fixed', display:"inline-block", paddingTop: 64} : { paddingTop: 64}}>
      <AppBar />
        <FadeDialog in={!!this.state.dialog} selectedLot={selectedLot} onSave={(lot: ILot)=>{this.onSave(lot);this.closeDialog()}} onClose={()=>this.closeDialog()}/>  
        <Row>
          {numberCols}
        </Row>
        {rows}
        <iframe width="560" height="315" src="https://www.youtube.com/embed/6kql6qiWO40?autoplay=1;rel=0"></iframe>
      </div>
    );
  }
}

export default App;
