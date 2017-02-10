import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap'


export default class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {value:'localhost:8001'}
  }

  getValidationState = () => {
    const length = this.state.value.length;
    if (length > 5) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  addElevator = () => {
    this.props.add(this.state.value);
    this.setState({value:'localhost:'})

  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Address to node</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="http://localhost:8001"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <p><Button bsStyle="primary" onClick={this.addElevator} >Add</Button></p>
        </FormGroup>
      </form>
    );
  }
};
