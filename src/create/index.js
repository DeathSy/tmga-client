import React from 'react'

import {
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'

import Constraint from './constraints'
import Confirmation from './confirmation'
import OtherFac from './otherFac'
import Sections from './sections'

const styles = theme => ({
  root: {
    width: '90%'
  },
  stepsContainer: {
    padding: theme.spacing.unit * 3
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  }
})

const steps = [
  { title: 'Please add SIT classes', component: Sections },
  { title: 'Please add GEN, LNG or SSC classes', component: OtherFac },
  { title: 'Please fill in lecturer needs (if any)', component: Constraint },
  { title: 'Confirmation', component: Confirmation }
]

export class Create extends React.Component {
  state = {
    activeStep: 0
  }

  handleClick = activeStep => () => this.setState({ activeStep })

  render () {
    const { classes } = this.props
    const { activeStep } = this.state
    return (
      <div className={classes.root}>
        <Paper className={classes.stepsContainer}>
          <Typography align='center' component='h1' variant='title'>
            STEPS TO CREATE 2/2018 TIMETABLE
          </Typography>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((step, index) => (
              <Step key={step.title}>
                <StepLabel>{step.title}</StepLabel>
                <StepContent>
                  {
                    <step.component
                      onClick={this.handleClick(activeStep + 1)}
                      onBack={this.handleClick(activeStep - 1)}
                    />
                  }
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Create)
