import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { GET_LIST } from 'react-admin'
import loopbackRestClient from 'aor-loopback'
import axios from 'axios'

const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%'
  },
  actionContainer: {
    margin: theme.spacing.unit
  },
  button: {
    marginRight: theme.spacing.unit
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
})

const steps = [
  { title: 'Select a subject' },
  { title: 'Select a day' },
  { title: 'Select start and end time' }
]

export class OtherModal extends React.Component {
  async componentWillMount () {
    dataProvider(GET_LIST, 'TimeSlots', {
      pagination: { page: 1, perPage: 26 },
      sort: { field: 'start', order: 'ASC' }
    })
      .then(response => response.data)
      .then(slots => {
        this.setState({ timeSlots: slots })
      })

    const filter = JSON.stringify({
      where: {
        or: [
          { code: { like: 'GEN', option: 'i' } },
          { code: { like: 'LNG', option: 'i' } }
        ]
      }
    })
    const subject = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/subjects?filter=${filter}`
    )
    this.setState({
      subjects: subject.data
    })
  }

  state = {
    subjects: [],
    activeStep: 0,
    subjectName: undefined,
    day: undefined,
    startTime: undefined,
    endTime: undefined
  }

  handleClick = activeStep => () => this.setState({ activeStep })

  handleSubmit = () => {
    this.props.onSubmit({
      code: this.state.subjectCode,
      name: this.state.subjectName,
      day: this.state.day,
      start: this.state.startTime,
      end: this.state.endTime
    })
    this.reset()
    this.props.onClick()
  }
  reset = () => {
    this.setState({
      activeStep: 0,
      subjectCode: undefined,
      subjectName: undefined,
      day: undefined,
      startTime: undefined,
      endTime: undefined
    })
  }
  handleChange = key => event => this.setState({ [key]: event.target.value })

  render () {
    const { activeStep, timeSlots, subjects } = this.state
    const { open, classes } = this.props

    return (
      <Dialog
        open={open}
        onClose={() => {
          this.reset()
          this.props.onClick()
        }}
      >
        <DialogTitle>Add Other Class</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label.title}>
                <StepLabel>{label.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 && (
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='subjectCode'>
                  Subject Code
                </InputLabel>
                <Select
                  value={this.state.subjectCode || ''}
                  onChange={this.handleChange('subjectCode')}
                >
                  {subjects.map(subject => (
                    <MenuItem key={subject.id} value={subject.code}>
                      {subject.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {activeStep === 1 && (
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='day'>
                  Day
                </InputLabel>
                <Select
                  value={this.state.day || ''}
                  onChange={this.handleChange('day')}
                >
                  <MenuItem value='MON'>Monday</MenuItem>
                  <MenuItem value='TUE'>Tuesday</MenuItem>
                  <MenuItem value='WED'>Wednesday</MenuItem>
                  <MenuItem value='THU'>Thursday</MenuItem>
                  <MenuItem value='FRI'>Friday</MenuItem>
                </Select>
              </FormControl>
            )}
            {activeStep === 2 && (
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor='startTime'>
                    Start Time
                  </InputLabel>
                  <Select
                    value={this.state.startTime}
                    onChange={this.handleChange('startTime')}
                  >
                    {timeSlots.map(slot => (
                      <MenuItem key={slot.id} value={slot.end}>
                        {slot.start}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor='endTime'>
                    End Time
                  </InputLabel>
                  <Select
                    value={this.state.endTime}
                    onChange={this.handleChange('endTime')}
                  >
                    {timeSlots.map(slot => (
                      <MenuItem key={slot.id} value={slot.end}>
                        {slot.end}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            <div className={classes.actionContainer}>
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={this.handleClick(activeStep - 1)}
              >
                Back
              </Button>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={
                  activeStep === steps.length - 1
                    ? this.handleSubmit
                    : this.handleClick(activeStep + 1)
                }
              >
                {activeStep === steps.length - 1 ? 'Add' : 'Next'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(OtherModal)
