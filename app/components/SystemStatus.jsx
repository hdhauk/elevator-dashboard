import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import Elevator from './elevator';


export default class SystemStatus extends React.Component {

  renderElevators = () =>
    this.props.elevators.map(
      el =>
        <Elevator
          key={el.id}
          header={el.header}
          subtitle={el.subtitle}
          currentFloor={el.currentFloor}
          direction={el.direction}
          floors={el.floors}
        />);

  render() {
    return (
      <div style={styles.container}>
        {this.renderElevators()}
      </div>
    );
  }
}

SystemStatus.propTypes = {
  elevators: React.PropTypes.array,
};

SystemStatus.defaultProps = {
  elevators: [
    {
      id: 1,
      header: 'Elevator 1',
      subtitle: '---',
      currentFloor: 2,
      floors: 4,
    },
  ],
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  unitCards: {
    display: 'flex',
    flex: 1,
  },
};
