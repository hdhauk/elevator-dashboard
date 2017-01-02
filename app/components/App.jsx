import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import SystemStatus from './SystemStatus';
import ElevatorCreator from './elevator-creator';
import MockElevators from './mock-elevators.js';


require('./App.css');

export default class App extends React.Component {

  state = {
    elevators: MockElevators,
  };


  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  addElevator = (el) => {
    const prev = this.state.elevators;
    prev[el.id.id] = el.id;
    this.setState({ elevators: prev });
  }

  render() {
    return (
      <div style={styles.container}>
        <Drawer width={DRAWERWIDTH}>
          <AppBar
            title="Elevator"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}

          />
          <ElevatorCreator addElevator={this.addElevator} />
        </Drawer>
        <div style={styles.dash}>
          <AppBar showMenuIconButton={false} />
          <SystemStatus elevators={Object.values(this.state.elevators)} />
        </div>
      </div>

    );
  }
}
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const DRAWERWIDTH = 300;
const styles = {
  container: {
    borderWidth: 2,
    borderColor: 'red',
  },
  dash: {
    marginLeft: DRAWERWIDTH,
  },
};
