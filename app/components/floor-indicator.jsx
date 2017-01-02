import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import ArrowUpwardIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';
import { blue500 } from 'material-ui/styles/colors';


const renderIcon = (isOnFloor, direction) => {
  if (isOnFloor) {
    switch (direction) {
      case 'up':
        return (<ArrowUpwardIcon color={blue500} />);
      case 'down':
        return (<ArrowDownwardIcon color={blue500} />);
      default:
        return <RadioButtonChecked color={blue500} />;
    }
  }
  return <RadioButtonUnchecked />;
};


const FloorIndicator = (props) => {
  const currentFloor = props.currentFloor - 1;
  const btnPress = (e) => {
    console.log(props);
    console.log(e);
  };
  const direction = props.direction;
  return (<div style={{ maxWidth: 500, maxHeight: 400, margin: 'auto' }}>
    <Stepper
      activeStep={currentFloor}
      linear={false}
      orientation="vertical"
    >
      <Step>
        <StepButton
          onTouchTap={btnPress}
          completed={true}
          icon={renderIcon(currentFloor === 3, direction)}
        >
          Floor 4
        </StepButton>
      </Step>
      <Step>
        <StepButton
          onTouchTap={btnPress}
          icon={renderIcon(currentFloor === 2, direction)}
        >
          Floor 3
        </StepButton>
      </Step>
      <Step>
        <StepButton
          onTouchTap={btnPress}
          icon={renderIcon(currentFloor === 1, direction)}
        >
          Floor 2
        </StepButton>
      </Step>
      <Step>
        <StepButton
          onTouchTap={btnPress}
          icon={renderIcon(currentFloor === 0, direction)}
        >
          Floor 1
        </StepButton>
      </Step>
    </Stepper>
  </div>);
};


export default FloorIndicator;
FloorIndicator.propTypes = {
  currentFloor: React.PropTypes.number.isRequired,
  direction: React.PropTypes.string,
  onBtnPress: React.PropTypes.func,
};
