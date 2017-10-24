import { Statuses, Types } from '../../api/get';
import * as React from 'react';
import './LotDialog.css';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

class LotDialog extends React.Component<any, any> {
  handleChange(floor: number, name: any, event: any) {
    console.log(floor,name,event.target.value)
    const floors = this.state.floors  
    floors[floor][name] = event.target.value
    floors[floor].floor = floor
    this.setState({floors: floors });
      
  }
  onDelete(floor: number) {
    delete this.state.floors[floor].floor
    delete this.state.floors[floor].individual
    delete this.state.floors[floor].type
    delete this.state.floors[floor].status
    this.setState({floors: this.state.floors });
  }
  componentWillMount(){
    let lot = {...this.props.lot}
    lot.floors = lot.floors.slice()
    for(let i = 0; i < lot.floors.length; i++) {
        lot.floors[i] = {...lot.floors[i]}
    }
    this.setState({...lot, selectedFloor: 0})
  }
  selectFloor(floor: number) {
    this.setState({selectedFloor: floor})
  }
  getFloorContent(floor: number) {
    if(!this.state || !this.state) {
      return ""
    }
    let individual = ""
    let status = Statuses.NONE
    let type = Types.empty
    individual = (this.state.floors[floor] || {}).individual || ""
    status = (this.state.floors[floor] || {}).status || Statuses.NONE
    type = (this.state.floors[floor] || {}).type || Types.empty
    
    return (
      <div style={{display: 'flex', flexDirection: 'column', marginBottom: 0}}>
        <div style={{flex: 1}}>
        <TextField
          id="individual"
          placeholder="Individ"
          value={individual}
          style={{width: '100%'}}
          onChange={(event) => this.handleChange(floor,'individual', event)}
        />
          {}
        </div>
        <div style={{flex: 0.1}}/>
        <div style={{flex: 1}}>
        <form autoComplete="off">
        <FormControl style={{width: '100%'}}>
          <Select
            value={type}
            input={<Input id="age-simple" />}
            onChange={(event) => this.handleChange(floor,'type', event)}
            style={{width: '100%'}}
          >
          <MenuItem value={Types.empty}>Tom</MenuItem>
          <MenuItem value={Types.Flexi}>Flexi</MenuItem>
          <MenuItem value={Types.shed}>Bod</MenuItem>
          <MenuItem value={Types.container}>Container</MenuItem>
          <MenuItem value={Types.toilet}>Toalett</MenuItem>
          <MenuItem value={Types.staffWagon}>Personalvagn</MenuItem>
          <MenuItem value={Types.other}>Annat</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{width: '100%'}}>
          
          <Select
            value={status}
            input={<Input id="age-simple" />}
            style={{width: '100%'}}
            onChange={(event) => this.handleChange(floor, 'status', event)}
          >
            <MenuItem value={Statuses.AVA}>AVA</MenuItem>
            <MenuItem value={Statuses.NCO}>NCO</MenuItem>
            <MenuItem value={Statuses.REP}>REP</MenuItem>
            <MenuItem value={Statuses.RNT}>RNT</MenuItem>
            <MenuItem value={Statuses.NONE}>Inget</MenuItem>
            
          </Select>
        </FormControl>
        </form>
        </div>
      </div>
    )
    
  }
  render() {
    if(!this.props || !this.props.lot) {
      return <div />
    }
    let floors = []
    let mobile = window.innerWidth < 1024
    const style = this.props.style || {}
    const cardStyle = mobile ? 
    {} :
    {width: 350}
    let selectedFloor = this.state.selectedFloor
      floors.push(
      <div>
        <Typography type="headline" component="h3">
          Våning {selectedFloor+1} <IconButton style={{margin: 0}} aria-label="Delete" onClick={() => this.onDelete(2-selectedFloor)}>
         <DeleteIcon />
        </IconButton>
        </Typography>
          {this.getFloorContent(2-selectedFloor)}
        </div>)
    
    let floorSelectors = []
    
    for(let f = 0; f < (((this.state || {}).floors) || []).length; f++) {
      console.log(f)
      //let floor = this.state.floors[f]
      floorSelectors.push(
      <Card 
        key={f} 
        onClick={() => this.selectFloor(f)}
        style={{
          width: '30%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: f == this.state.selectedFloor ? 'white' : '#394253',
          paddingTop: 10,
          paddingBottom: 10
        }}>
        <span style={{fontWeight: 800, fontSize: 25, color: f != this.state.selectedFloor ? 'rgba(255,255,255,0.7)' : '#504C9C'}}>
          {f+1}
        </span>
      </Card>
      )
   }
  
    return (
      <div  style={{ zIndex: 1300, overflowY: 'auto', position: 'fixed',  top: '0px', left:'0px', ...cardStyle, ...style}}>
        <div style={{display: 'flex', flexDirection: 'column', width:'100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            {floorSelectors}
          </div>
          <Card style={{margin: 10, marginBottom: 0, marginTop: 0}}>
            <CardContent>
              {floors}
            </CardContent>
          </Card>
          <Card style={{margin: 10, marginBottom: 0}}>
            <CardContent style={{textAlign: 'center'}}>
              <Button raised color="default" onClick={() => {
                  console.log(this.state)
                  this.props.onSave(this.state)
                }}
              >
                Spara
              </Button>
              <Button raised color="primary" onClick={this.props.onClose} style={{marginLeft: 10}}>
                Stäng
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

export default LotDialog;
