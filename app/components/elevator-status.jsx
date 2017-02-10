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
    setInterval(this.fetchStatus, 1000)

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
              <Button bsStyle={this.state.up[0]}>0</Button>
              <Button bsStyle={this.state.up[1]}>1</Button>
              <Button bsStyle={this.state.up[2]}>2</Button>
              <Button bsStyle="link"></Button>
            </ButtonGroup>
          </ButtonToolbar>
          <h4><Label>Hall Down buttons</Label></h4>
          <span style={{width:2}}></span><ButtonToolbar>
            <ButtonGroup>
              <Button bsStyle="link"></Button>
              <Button bsStyle={this.state.down[1]}>1</Button>
              <Button bsStyle={this.state.down[2]}>2</Button>
              <Button bsStyle={this.state.down[3]}>3</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
