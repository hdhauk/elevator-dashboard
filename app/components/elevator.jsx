import React from 'react';
import {
  Card,
  CardHeader,
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FloorIndicator from './floor-indicator';

injectTapEventPlugin();


const Elevator = props =>
  <Card style={styles.unitCards}>
    <CardHeader
      title={props.header}
      subtitle={props.subtitle}
      actAsExpander={false}
      showExpandableButton={false}
    />
    <Divider />
    <FloorIndicator
      currentFloor={props.currentFloor}
      direction={props.direction}
    />
  </Card>;

export default Elevator;
Elevator.propTypes = {
  header: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  currentFloor: React.PropTypes.number,
  direction: React.PropTypes.string,
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
    margin: 10,
  },
};
