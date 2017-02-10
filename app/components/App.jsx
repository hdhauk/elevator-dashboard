import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import Form from './input.jsx';
import Elevator from './elevator-status.jsx'
require('./App.css');



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevators:[]
    }
  }

  addElevator = (address) => {
    console.log(address)
    let lifts = this.state.elevators.concat(<Elevator address={address} key ={address}/>)
    this.setState({elevators:lifts})
  }

  renderLifts = () => {

  }



  render() {
    return (
      <div style={{margin:20}}>
        <div style={{padding:10}}>
          <Jumbotron>
            <h1>Elevator status</h1>
            <Form  add={this.addElevator} />
          </Jumbotron>
          <div style={{flexDirection:"row", display:"flex", "justifyContent":"space-around"}}>
            {this.state.elevators}
          </div>
        </div>
      </div>
    );
  }
}
