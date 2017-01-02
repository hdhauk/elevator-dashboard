import React from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import guid from './utils';

class ElevatorCreator extends React.Component {
  state = {
    header: '',
    subtitle: '',
    direction: 'none',
  };

  clickAction = () => {
    const id = guid();
    const newMockElevator = {
      id: {
        id,
        header: this.state.header,
        subtitle: this.state.subtitle,
        currentFloor: 3,
        floors: 4,
        direction: this.state.direction,
      },
    };
    this.props.addElevator(newMockElevator);
    this.setState({
      header: '',
      subtitle: '',
      direction: 'none',
    });
  }

  changeDirection = (event, index, value) => this.setState({ direction: value })

  render() {
    return (
      <div style={styles.container}>
        <Subheader>Add new mock elevator</Subheader>
        <TextField
          floatingLabelText="Elevator name"
          onChange={e => this.setState({ header: e.target.value })}
          value={this.state.header}
        />
        <TextField
          floatingLabelText="Subtitle"
          onChange={e => this.setState({ subtitle: e.target.value })}
          value={this.state.subtitle}
        />
        <SelectField
          floatingLabelText="Direction"
          value={this.state.direction}
          onChange={this.changeDirection}
        >
          <MenuItem value="none" primaryText="none" />
          <MenuItem value="up" primaryText="up" />
          <MenuItem value="down" primaryText="down" />
        </SelectField>
        <RaisedButton
          label="Add"
          primary={true}
          style={styles.btn}
          onClick={this.clickAction}
        />
      </div>);
  }
}

export default ElevatorCreator;

ElevatorCreator.propTypes = {
  addElevator: React.PropTypes.func,
};

const styles = {
  container: {
    padding: 15,
  },
  btn: {
    margin: 12,
  },
};
