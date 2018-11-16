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
import FixedCons from './fixedConstraints'

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
  { title: 'Please add SIT classes', id: 'sitClasses', component: Sections },
  {
    title: 'Please add GEN, LNG or SSC classes',
    id: 'otherFacClasses',
    component: OtherFac
  },
  {
    title: 'Please add fixed conditions',
    id: 'fixConditions',
    component: FixedCons
  },
  {
    title: 'Please fill in lecturer needs (if any)',
    id: 'lecturerConditions',
    component: Constraint
  },
  { title: 'Confirmation', id: 'confirmation', component: Confirmation }
]

export class Create extends React.Component {
  state = {
    activeStep: 0,
    sitClasses: [],
    otherFacClasses: [],
    fixConditions: [],
    lecturerConditions: []
  }

  handleClick = (activeStep, key) => data => () => {
    this.setState({ activeStep, [key]: data })
  }

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
                      data={this.state[step.id]}
                      onClick={this.handleClick(activeStep + 1, step.id)}
                      onBack={this.handleClick(activeStep - 1, step.id)}
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
