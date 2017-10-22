import { Statuses, Types } from '../../api/get';
import * as React from 'react';
import './LotDialog.css';
import Card, { CardActions, CardContent } from 'material-ui/Card';
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
  componentDidMount(){
    let lot = {...this.props.lot}
    lot.floors = lot.floors.slice()
    for(let i = 0; i < lot.floors.length; i++) {
        lot.floors[i] = {...lot.floors[i]}
    }
    this.setState({...lot})
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
    {width: '100vw', height: '100vh'} :
    {}
    for(let i = 2; i >= 0; i--) {
      floors.push(
      <div key={i}>
        <Typography type="headline" component="h3">
          Våning {3-i} <IconButton style={{margin: 0}} aria-label="Delete" onClick={() => this.onDelete(i)}>
         <DeleteIcon />
        </IconButton>
        </Typography>
          {this.getFloorContent(i)}
        </div>)
    }
    return (
      <Card style={{position: 'fixed', top:0, zIndex: 10000, overflowY: 'scroll', ...cardStyle, ...style}}>
      <CardContent>
        {floors}
      </CardContent>
      <CardActions>
        <Button raised color="default" onClick={() => {
          console.log(this.state)
          this.props.onSave(this.state)
        }}
          >
          Spara
        </Button>
        <Button raised color="primary" onClick={this.props.onClose}>
          Stäng
        </Button>
      </CardActions>
      </Card>
    )
  }
}

export default LotDialog;
