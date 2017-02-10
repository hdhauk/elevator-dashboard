import React from 'react';
import {
  Pagination,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Label
} from 'react-bootstrap';

export default class Elevator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      floor: 1,
      down:{
        "1": "default",
        "2": "default",
        "3": "default"
      },
      "up":{
        "0":"default",
        "1": "default",
        "2": "default"
      }
    };
  }


  componentDidMount(){
    setInterval(this.fetchStatus, 500)

}

fetchStatus = () => {
  const addr = 'http://' + this.props.address + '/debug/dump-state'
  fetch(addr)
.then(function(response) {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json();
})
.then((data) => {
  this.applyButtons(data)
});

}

  applyButtons = (data) => {
    let ups = {}
    for (var key in data.HallUpButtons){
      if (data.HallUpButtons[key].LastStatus === "unassigned") {
        ups[key] = "warning"
      }

    }
    let downs = {}
    for (var key in data.HallDownButtons){
      if (data.HallDownButtons[key].LastStatus === "unassigned"){
        downs[key] = "warning"
      }
    }
    this.setState({"up":ups, "down":downs})
  }

  handleSelect =  (eventKey) => {
    this.setState({
      floor: eventKey,

    });
  }

  sendUpCommand = (e) => {
    console.log(e)
    fetch(`http://${this.props.address}/update/button`,{
      method: 'POST',
      header:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        Floor: e,
        Dir: 'up',
        Status: 'unassigned'
      })
    })
  }

  sendDownCommand = (e) => {
    console.log(e)
    fetch(`http://${this.props.address}/update/button`,{
      method: 'POST',
      header:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        Floor: e,
        Dir: 'down',
        Status: 'unassigned'
      })
    })
  }


  render(){
    return (
      <div style={{padding:20, borderColor:"black", borderWidth:5, flex:1}}>
        <div style={{padding:5}}>
          <h2><Label>{this.props.address}</Label></h2>
        </div>

        <div style={{padding:5}}>
          <h4><Label>Hall Up buttons</Label></h4>
          <ButtonToolbar>
            <ButtonGroup>
              <Button bsStyle={this.state.up[0]} onClick={this.sendUpCommand.bind(this,0)} key={1} >0</Button>
              <Button bsStyle={this.state.up[1]} onClick={this.sendUpCommand.bind(this,1)} key={2} >1</Button>
              <Button bsStyle={this.state.up[2]} onClick={this.sendUpCommand.bind(this,2)} key={3} >2</Button>
              <Button bsStyle="link">-</Button>
            </ButtonGroup>
          </ButtonToolbar>
          <h4><Label>Hall Down buttons</Label></h4>
          <span style={{width:2}}></span><ButtonToolbar>
            <ButtonGroup>
              <Button bsStyle="link">-</Button>
              <Button bsStyle={this.state.down[1]} onClick={this.sendDownCommand.bind(this,1)} key={4} >1</Button>
              <Button bsStyle={this.state.down[2]} onClick={this.sendDownCommand.bind(this,2)} key={5} >2</Button>
              <Button bsStyle={this.state.down[3]} onClick={this.sendDownCommand.bind(this,3)} key={6} >3</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
